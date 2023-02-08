import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <meta name='description' content='Multiple Replace Online' />
                <meta name='author' content='awmaker' />
                <meta
                    name='keywords'
                    content='multiple, replace, online, tool, editor, text, file, string, regex'
                />
                <meta name='theme-color' content='#000000' />
                <meta name='msapplication-TileColor' content='#000000' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
