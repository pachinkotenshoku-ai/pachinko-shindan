
import { Question } from './types';

export const QUESTIONS: Question[] = [
  // --- プロフィール・スキルセクション ---
  {
    id: 'age',
    text: 'あなたの現在の年齢層を教えてください。',
    options: [
      { value: 'u25', label: '25歳以下', description: 'ポテンシャル採用の枠が広いです' },
      { value: '26-35', label: '26歳〜35歳', description: '現場リーダーや中堅層として期待されます' },
      { value: '36-45', label: '36歳〜45歳', description: 'マネジメント経験が重視される年齢層です' },
      { value: 'o46', label: '46歳以上', description: '豊富な経験や特殊なスキルが求められます' }
    ]
  },
  {
    id: 'experience',
    text: 'パチンコ業界での職務経験はどのくらいですか？',
    options: [
      { value: 'none', label: '未経験', description: '新しい業界へのチャレンジ' },
      { value: '1-3y', label: '1年〜3年', description: '現場の基本業務は一通りこなせる' },
      { value: '3-7y', label: '3年〜7年', description: '役職経験や特定の強みがある' },
      { value: '7y+', label: '7年以上', description: '店長職や本部業務の経験がある' }
    ]
  },
  {
    id: 'current_role',
    text: '現在の（または直近の）役職は何ですか？',
    options: [
      { value: 'staff', label: '一般社員・アルバイト', description: 'ホール・カウンター業務中心' },
      { value: 'leader', label: '班長・主任・リーダー', description: '現場の統括、スタッフ育成' },
      { value: 'manager', label: '店長・副店長', description: '店舗の数値管理、経営判断' },
      { value: 'hq', label: '本部職・エリアマネージャー', description: '複数店舗管理、企画、人事など' }
    ]
  },
  {
    id: 'skills',
    text: 'あなたの最も自信のあるスキルは？',
    options: [
      { value: 'service', label: '接客・おもてなし', description: '接客コンテスト入賞やファン作り' },
      { value: 'technic', label: '釘メンテナンス・設定管理・遊技機管理', description: '盤面メンテナンスや利益シミュレーション' },
      { value: 'hr', label: '採用・スタッフ育成', description: '教育マニュアル作成やチームビルディング' },
      { value: 'marketing', label: '販促企画・データ分析', description: 'SNS運用やイベント企画、稼働分析' }
    ]
  },
  // --- 希望条件セクション ---
  {
    id: 'priority',
    text: '転職において、あなたが最も重視する要素は何ですか？',
    options: [
      { value: 'salary', label: '給与・年収アップ', description: '生活水準を上げたい、稼ぎたい' },
      { value: 'wlb', label: 'ワークライフバランス', description: '休日数、残業の少なさ、プライベート重視' },
      { value: 'culture', label: '社風・人間関係', description: '風通しの良さ、チームワーク重視' },
      { value: 'career', label: 'キャリアアップ・役職', description: '早く店長になりたい、マネジメントに興味' }
    ]
  },
  {
    id: 'scale',
    text: '希望する企業の規模感は？',
    options: [
      { value: 'large', label: '大手チェーン店', description: '福利厚生が充実、研修制度が整っている' },
      { value: 'local', label: '地域密着型・中小', description: '裁量が大きい、地元に貢献できる' },
      { value: 'private', label: '個人経営・小規模', description: 'アットホーム、独自ルールがある' },
      { value: 'any', label: '特にこだわらない', description: '条件が良ければ規模は問わない' }
    ]
  }
];
