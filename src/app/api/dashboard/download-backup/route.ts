import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { dashboardState } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_DASHBOARD_DATA } from '@/types/dashboard';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';

    const backupsDir = path.join(process.cwd(), 'public', 'backups');
    const backupFilePath = path.join(backupsDir, `dashboard-${userId}.json`);

    let content: string;

    if (fs.existsSync(backupFilePath)) {
      content = fs.readFileSync(backupFilePath, 'utf-8');
    } else {
      const row = db
        .select()
        .from(dashboardState)
        .where(eq(dashboardState.userId, userId))
        .get();

      const snapshot = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'marketreplay.firebasestorage.app',
        firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'marketreplay',
        storagePath: `dashboards/${userId}/dashboard-backup.json`,
        dashboardData: row || INITIAL_DASHBOARD_DATA,
      };
      content = JSON.stringify(snapshot, null, 2);
    }

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="market-replay-dashboard-${userId}-backup.json"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) throw error;
    console.error('API /api/dashboard/download-backup error:', error);
    return NextResponse.json({ error: 'Failed to download backup' }, { status: 500 });
  }
}
