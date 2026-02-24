import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { LoadingIcon } from '../../components/Loading'
import { extractAuthCodeFromRedirected, generateAuthorisationUrl } from '../../utils/oAuthHandler'

export default function OAuthStep2() {
  const router = useRouter()

  const [oAuthRedirectedUrl, setOAuthRedirectedUrl] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const oAuthUrl = generateAuthorisationUrl()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{`OAuth Step 2 - ${siteConfig.title}`}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />

        <div className="mx-auto w-full max-w-5xl p-4">
          <div className="rounded bg-white p-3 dark:bg-gray-900 dark:text-gray-100">
            <div className="mx-auto w-52">
              <Image
                src="/images/fabulous-come-back-later.png"
                width={912}
                height={912}
                alt="fabulous come back later"
                priority
              />
            </div>
            <h3 className="mb-4 text-center text-xl font-medium">{'欢迎使用 onedrive-cf-index-ng 🎉'}</h3>

            <h3 className="mb-2 mt-4 text-lg font-medium">{'步骤 2/3：获取授权码'}</h3>

            <p className="py-1 text-sm font-medium text-red-400">
              <FontAwesomeIcon icon="exclamation-circle" className="mr-1" /> 如果您不是此网站的管理员，请立即停止操作，继续操作可能会暴露您在 OneDrive 中的个人文件。
            </p>

            <div
              className="relative my-2 cursor-pointer rounded border border-gray-500/50 bg-gray-50 font-mono text-sm hover:opacity-80 dark:bg-gray-800"
              onClick={() => {
                window.open(oAuthUrl)
              }}
            >
              <div className="absolute right-0 top-0 p-1 opacity-60">
                <FontAwesomeIcon icon="external-link-alt" />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap p-2">
                <code>{oAuthUrl}</code>
              </pre>
            </div>

            <p className="py-1">
              获取授权码的 OAuth 链接已生成。点击上方链接以获取{' '}
              <b className="underline decoration-yellow-400 decoration-wavy">授权码</b>。您的浏览器将打开一个新标签页，跳转至 Microsoft 账号登录页面。登录并完成 Microsoft 账号认证后，您将被重定向到 localhost 上的空白页面。请将{' '}
              <b className="underline decoration-teal-500 decoration-wavy">整个重定向 URL</b> 粘贴到下方。
            </p>

            <div className="mx-auto my-4 w-2/3 overflow-hidden rounded">
              <Image src="/images/step-2-screenshot.png" width={1466} height={607} alt="step 2 screenshot" />
            </div>

            <input
              className={`my-2 w-full flex-1 rounded border bg-gray-50 p-2 font-mono text-sm font-medium focus:outline-none focus:ring dark:bg-gray-800 dark:text-white ${
                authCode
                  ? 'border-green-500/50 focus:ring-green-500/30 dark:focus:ring-green-500/40'
                  : 'border-red-500/50 focus:ring-red-500/30 dark:focus:ring-red-500/40'
              }`}
              autoFocus
              type="text"
              placeholder="http://localhost/?code=M.R3_BAY.c0..."
              value={oAuthRedirectedUrl}
              onChange={e => {
                setOAuthRedirectedUrl(e.target.value)
                setAuthCode(extractAuthCodeFromRedirected(e.target.value))
              }}
            />

            <p className="py-1">{'提取到的授权码为：'}</p>
            <p className="my-2 overflow-hidden truncate rounded border border-gray-400/20 bg-gray-50 p-2 font-mono text-sm opacity-80 dark:bg-gray-800">
              {authCode ?? <span className="animate-pulse">{'等待授权码...'}</span>}
            </p>

            <p>
              {authCode
                ? '✅ 您现在可以进行下一步：请求访问令牌和刷新令牌。'
                : '❌ 未提取到有效的授权码。'}
            </p>

            <div className="mb-2 mt-6 text-right">
              <button
                className="rounded-lg bg-gradient-to-br from-green-500 to-cyan-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:grayscale dark:focus:ring-green-800"
                disabled={authCode === ''}
                onClick={() => {
                  setButtonLoading(true)
                  router.push({ pathname: '/onedrive-oauth/step-3', query: { authCode } })
                }}
              >
                {buttonLoading ? (
                  <>
                    <span>{'正在请求令牌'}</span> <LoadingIcon className="ml-1 inline h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{'获取令牌'}</span> <FontAwesomeIcon icon="arrow-right" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
