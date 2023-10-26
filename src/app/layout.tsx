import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2lover',
  description: "情侣互动小工具",
  metadataBase: new URL("https://2l.haxck.com"),
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cn" >
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
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
