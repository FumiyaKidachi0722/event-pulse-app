// src/libs/infra/summary-repo.ts
import admin from "firebase-admin";
import type { SummaryItem } from "@/libs/usecases/fetchSummary";

// 環境変数チェック
const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;
if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error(
    "Firebase Admin の環境変数が未設定です: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY を確認してください"
  );
}

// Admin SDK 初期化（重複防止）
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

/**
 * 指定期間の summary コレクションを取得
 */
export async function getSummaryData(params: {
  from: string;
  to: string;
}): Promise<SummaryItem[]> {
  // 日付範囲の調整
  const fromDate = new Date(params.from);
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date(params.to);
  toDate.setHours(23, 59, 59, 999);

  const snapshot = await db
    .collection("summary")
    .where("date", ">=", fromDate)
    .where("date", "<=", toDate)
    .orderBy("date")
    .get();

  return snapshot.docs.map((doc) => {
    const d = doc.data();
    const ts = d.date as admin.firestore.Timestamp;
    return {
      date: ts.toDate().toISOString().slice(0, 10),
      companyName: String(d.companyName),
      amount: Number(d.amount) || 0,
    };
  });
}
