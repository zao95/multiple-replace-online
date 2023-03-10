import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function Home() {
    const [split, setSplit] = useState<string>('->')
    const [rule, setRule] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        if (!file || !rule || !split) return
        const rules = rule
            .split(/\n|\r/g)
            .filter((rule) => rule !== '')
            .map((rule) => rule.split(split))
        let _file = file
        rules.forEach((_rule) => {
            const [from, to] = _rule
            _file = _file.replaceAll(from, to)
        })
        setResult(_file)
        toast.success('Replace successfully')
    }, [file, rule, split])
    const handleSplitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSplit(e.target.value)
    }
    const handleRuleChange = (e: any) => {
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            const text = e.target.result
            setRule(text)
            toast.success('Rule loaded successfully')
        }
        reader.readAsText(e.target.files[0])
    }
    const handleFileChange = (e: any) => {
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            const text = e.target.result
            setFile(text)
            toast.success('File loaded successfully')
        }
        reader.readAsText(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const downloadTxtFile = () => {
        const element = document.createElement('a')
        const file = new Blob([result], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `edited_${fileName}`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <>
            <Head>
                <title>Multiple Replace Online</title>
            </Head>

            <main className={styles.main}>
                <h1>Multiple Replace Online</h1>
                <br />
                <form onSubmit={(e) => e.preventDefault()}>
                    <h3>Separator</h3>
                    <div className={styles.divide}>
                        <label>Separator: </label>
                        <input
                            name='split'
                            type='text'
                            value={split}
                            onChange={handleSplitChange}
                        />
                    </div>
                    <h3>Rule</h3>
                    <div className={styles.divide}>
                        <label htmlFor='file'>Rule File: </label>
                        <input
                            name='rule'
                            type='file'
                            accept='.txt'
                            onChange={handleRuleChange}
                        />
                        <div>
                            Rule Example
                            <p>A{split}A`</p>
                            <p>B{split}B`</p>
                        </div>
                    </div>
                    <h3>Target File</h3>
                    <div className={styles.divide}>
                        <label htmlFor='file'>Target File: </label>
                        <input
                            name='file'
                            type='file'
                            accept='.txt'
                            onChange={handleFileChange}
                        />
                    </div>
                    {result && (
                        <>
                            <h3>Download Result</h3>
                            <div className={styles.divide}>
                                <input
                                    type='button'
                                    value='Download'
                                    onClick={downloadTxtFile}
                                    className={styles.download}
                                />
                            </div>
                        </>
                    )}
                    {(rule || file) && <hr />}
                    {rule && (
                        <>
                            <h3>rule</h3>
                            <div className={styles.divide}>
                                <CopyToClipboard
                                    text={rule}
                                    onCopy={() => toast.success('Copy Success')}
                                >
                                    <button>Copy to clipboard</button>
                                </CopyToClipboard>
                                <pre>{rule}</pre>
                            </div>
                        </>
                    )}
                    {file && (
                        <>
                            <h3>file</h3>
                            <div className={styles.divide}>
                                <CopyToClipboard
                                    text={file}
                                    onCopy={() => toast.success('Copy Success')}
                                >
                                    <button>Copy to clipboard</button>
                                </CopyToClipboard>
                                <pre>{file}</pre>
                            </div>
                        </>
                    )}
                    {result && (
                        <>
                            <h3>result</h3>
                            <div className={styles.divide}>
                                <CopyToClipboard
                                    text={result}
                                    onCopy={() => toast.success('Copy Success')}
                                >
                                    <button>Copy to clipboard</button>
                                </CopyToClipboard>
                                <pre>{result}</pre>
                            </div>
                        </>
                    )}
                </form>
            </main>
        </>
    )
}
