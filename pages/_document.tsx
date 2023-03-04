import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='preconnect' href='https://cdn.sellix.io' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
        <link href='https://cdn.sellix.io/static/css/embed.css' rel='stylesheet' />
      </Head>
      <body className='text-rich-black dark:bg-dark dark:text-white'>
        <Main />
        <NextScript />
        <script defer src='https://cdn.sellix.io/static/js/embed.js'></script>
      </body>
    </Html>
  )
}
