// - **関数を定義して他のファイルからも使えるようにする**（`export`）
// - 関数名は `isToday`（「今日かどうかを判定する」という意味）
// - 引数 `date` は文字列型（例: `"2025-05-30"`）
// - 戻り値は `boolean`（`true` または `false`）

export const isToday = (dateStr: string): boolean => {
  const input = new Date(dateStr); // ユーザーが渡した日付　// 実際は "2025-06-01T00:00:00.000"
  const today = new Date(); //今の日時　// 例: "2025-06-01T14:32:10.123"

  // 時間を00:00:00にリセット（時刻差を無視）
  // 「日付だけ」を比較できるようになる
  input.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return input.getTime() === today.getTime();
};

export const isThisWeek = (dateStr: string): boolean => {
  const input = new Date(dateStr);
  const today = new Date();

  // 0時にリセット（時刻を無視するため）
  input.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = input.getTime() - today.getTime();

  //ミリ秒を「日数」に変換
  // 1000（ミリ秒）× 60（秒）× 60（分）× 24（時間）＝ 1日分のミリ秒数
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // 今日から数えて 0〜6 日以内なら “今週”
  return diffDays >= 0 && diffDays <= 6;
};
