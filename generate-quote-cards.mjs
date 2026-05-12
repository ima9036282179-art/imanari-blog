import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const quotes = [
  { id: '01', roman: 'Ⅰ',  text: 'バカとブスこそ東大へ行け',                                                                          desc: '見た目や偏差値で人生を諦めるな。シリーズを貫く代名詞的な一言。' },
  { id: '02', roman: 'Ⅱ',  text: 'ルールは賢い奴が自分に都合よく作ってんだ。だから勉強しろ。ルールを作る側に回れ。',                   desc: '社会の本質を突いた言葉。勉強の意義を根本から問い直させてくれる。' },
  { id: '03', roman: 'Ⅲ',  text: 'できない理由を探すな。できる方法を探せ。',                                                          desc: '言い訳をやめ、行動に転換するきっかけをくれる一言。' },
  { id: '04', roman: 'Ⅳ',  text: '諦めたらそこで試合終了じゃない。諦めた瞬間から、負けが始まるんだ。',                               desc: '終わりではなく「始まり」として捉える逆転の発想。' },
  { id: '05', roman: 'Ⅴ',  text: 'お前らが逃げているのは失敗することじゃない。本気になることだ。',                                   desc: '「本気になること」を恐れていることを鋭く指摘した言葉。' },
  { id: '06', roman: 'Ⅵ',  text: '勉強は才能じゃない。やり方と時間の問題だ。',                                                       desc: '「自分には無理」という思い込みを崩す言葉。' },
  { id: '07', roman: 'Ⅶ',  text: '東大に受かるかどうかは、結局やるかやらないかだ。',                                                 desc: 'シンプルだが核心を突く言葉。どんな問題もこれに尽きる。' },
  { id: '08', roman: 'Ⅷ',  text: '模試の点数はお前の実力じゃない。今の状態を示しているだけだ。',                                     desc: '結果に一喜一憂せず、プロセスを大切にすることの本質。' },
  { id: '09', roman: 'Ⅸ',  text: '人生に必要なのは、正しい努力と正しい方向性だ。',                                                   desc: 'がむしゃらに頑張るだけでなく、戦略的に動く重要性。' },
  { id: '10', roman: 'Ⅹ',  text: '教えることは最高の学習法だ。教えられないなら、まだ本当には理解していない。',                       desc: 'アウトプットの重要性を端的に表した名言。' },
  { id: '11', roman: 'Ⅺ',  text: '環境のせいにするな。環境を変えるのがお前の仕事だ。',                                               desc: '境遇を言い訳にしない強さを与えてくれる言葉。' },
  { id: '12', roman: 'Ⅻ',  text: '睡眠不足は最大の敵だ。寝ることも勉強のうちだ。',                                                   desc: '根性論を否定し、科学的な学習を推奨する桜木らしい言葉。' },
  { id: '13', roman: 'XIII', text: 'お前の弟は関係ない。今のお前に必要なのは比較じゃなく前進だ。',                                   desc: '他人との比較をやめ、自分の成長にフォーカスする大切さ。' },
  { id: '14', roman: 'XIV', text: '失敗は恥じゃない。挑戦しないことが恥だ。',                                                        desc: 'チャレンジすることへの勇気をくれる言葉。' },
  { id: '15', roman: 'XV',  text: '25分やったら5分休め。だらだら6時間より、集中した3時間の方が価値がある。',                         desc: '効率的な学習時間の使い方を示した実践的な言葉。' },
  { id: '16', roman: 'XVI', text: '好きなことだけやって生きていけると思うな。嫌いなことを乗り越えた先に、本当にやりたいことが見えてくる。', desc: '甘くない現実と向き合う覚悟を促す言葉。' },
  { id: '17', roman: 'XVII', text: '問題を解くな。問題を理解しろ。解き方を覚えても、問題が変われば使えない。',                       desc: '丸暗記ではなく理解を重視する学習姿勢の本質。' },
  { id: '18', roman: 'XVIII', text: '夢は見つけるものじゃなく、作るものだ。',                                                        desc: '夢がないことを悩む人への力強いメッセージ。' },
  { id: '19', roman: 'XIX', text: '逆転は、いつだって可能だ。ただし、今から始めた奴だけにな。',                                      desc: '希望と叱咤を同時に伝える、ドラゴン桜らしい言葉。' },
  { id: '20', roman: 'XX',  text: 'お前が変われば、周りも変わる。世界は外から変えるんじゃなく、内側から変わるんだ。',               desc: '自分自身の変革が世界を変えるという、ドラゴン桜の根底にあるメッセージ。' },
];

function buildHtml(quote) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 600px; height: 600px; background: #0d0020; display: flex; align-items: center; justify-content: center; }
  .card {
    width: 560px;
    min-height: 560px;
    background: linear-gradient(160deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%);
    border: 2px solid #c9a84c;
    border-radius: 14px;
    padding: 40px 36px;
    text-align: center;
    font-family: "Hiragino Mincho ProN", "Yu Mincho", "MS Mincho", Georgia, serif;
    box-shadow: 0 0 30px rgba(201,168,76,0.5), inset 0 0 60px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
  }
  .header {
    color: #c9a84c;
    font-size: 11px;
    letter-spacing: 5px;
    margin-bottom: 10px;
    font-family: Georgia, serif;
  }
  .roman {
    color: #c9a84c;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 18px;
    font-family: Georgia, serif;
  }
  .quote-box {
    border-top: 1px solid #c9a84c;
    border-bottom: 1px solid #c9a84c;
    padding: 20px 10px;
    margin-bottom: 18px;
    width: 100%;
  }
  .quote-text {
    color: #f5e6c0;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
  }
  .desc {
    color: #b8a880;
    font-size: 13px;
    line-height: 1.8;
    margin-bottom: 16px;
  }
  .author {
    color: #c9a84c;
    font-size: 12px;
    letter-spacing: 3px;
    font-family: Georgia, serif;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="header">✦ DRAGON ZAKURA ✦</div>
    <div class="roman">${quote.roman}</div>
    <div class="quote-box">
      <p class="quote-text">「${quote.text}」</p>
    </div>
    <p class="desc">${quote.desc}</p>
    <div class="author">― 桜木建二 ―</div>
  </div>
</body>
</html>`;
}

const outDir = path.resolve('./public/images/quote-cards');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 600, height: 600, deviceScaleFactor: 2 });

for (const quote of quotes) {
  await page.setContent(buildHtml(quote), { waitUntil: 'domcontentloaded' });
  const outPath = path.join(outDir, `quote-card-${quote.id}.png`);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`✓ quote-card-${quote.id}.png`);
}

await browser.close();
console.log('\n完了: 20枚の名言カード画像を生成しました');
console.log(`保存先: ${outDir}`);
