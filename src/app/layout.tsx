import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '2lover',
  description: '土味情话',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://npm.elemecdn.com/lxgw-wenkai-webfont@1/style.css"></link>
        <Script id='baidu'>
        {
          `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?d71838dec27d5468f69c49c776637dcb";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `
        }
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
