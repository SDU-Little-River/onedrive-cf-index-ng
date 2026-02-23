module.exports = {
  // 【重要】这是你的 Microsoft/OneDrive 登录邮箱。
  // 为了安全，建议这里不要直接写邮箱，而是保留下面这行代码不动。
  // 然后去 Cloudflare 后台的环境变量里添加一个叫 USER_PRINCIPLE_NAME 的变量，填入你的邮箱。
  // 如果你觉得麻烦，直接把 'me@lyc8503.net' 替换成你的邮箱 'xxxx@outlook.com' 也可以。
  userPrincipalName: process.env.USER_PRINCIPLE_NAME || '260342855@qq.com',

  // 网站图标，保持默认或者换成你自己的（把图片放在 public/icons 文件夹里）
  icon: '/icons/128.png',

  title: "test",

  // 【核心修改】你要展示的根目录。
  // 1. 如果你在 OneDrive 里专门建了一个叫 "FamilyPhotos" 的文件夹放照片，这里就填 '/FamilyPhotos'。
  // 2. 千万不要填 '/'，除非你想把你整个 OneDrive 网盘都公开展示！
  baseDirectory: process.env.BASE_DIRECTORY || '/FamilyPhotos',
  maxItems: 100,

  // 字体设置，保持默认即可
  googleFontSans: 'Inter',
  googleFontMono: 'Fira Mono',
  googleFontLinks: ['https://fonts.googleapis.com/css2?family=Fira+Mono&family=Inter:wght@400;500;700&display=swap'],

  // 【可选】页脚文字。可以改成简单的版权声明。
  footer:
    '© 2026 xhbsh',

  protectedRoutes: ['/FamilyPhotos'],

  email: '',

  links: [],

  // 日期格式，保持默认即可
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
}
