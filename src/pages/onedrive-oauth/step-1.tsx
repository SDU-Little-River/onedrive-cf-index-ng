import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import siteConfig from '../../../config/site.config'
import apiConfig from '../../../config/api.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function OAuthStep1() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{`OAuth Step 1 - ${siteConfig.title}`}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />

        <div className="mx-auto w-full max-w-5xl p-4">
          <div className="rounded bg-white p-3 dark:bg-gray-900 dark:text-gray-100">
            <div className="mx-auto w-52">
              <Image src="/images/fabulous-fireworks.png" width={912} height={912} alt="fabulous fireworks" priority />
            </div>
            <h3 className="mb-4 text-center text-xl font-medium">{'欢迎使用 onedrive-cf-index-ng 🎉'}</h3>

            <h3 className="mb-2 mt-4 text-lg font-medium">{'步骤 1/3：准备工作'}</h3>

            <p className="py-1">
              需要授权，因为此部署实例上没有有效的{' '}
              <code className="font-mono text-sm underline decoration-pink-600 decoration-wavy">access_token</code> 或{' '}
              <code className="font-mono text-sm underline decoration-green-600 decoration-wavy">refresh_token</code>。
              请在继续授权 onedrive-cf-index-ng 使用您的 Microsoft 账号前，检查以下配置。
            </p>

            <div className="my-4 overflow-hidden">
              <table className="min-w-full table-auto">
                <tbody>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      CLIENT_ID
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.clientId}</code>
                    </td>
                  </tr>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      CLIENT_SECRET*
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.obfuscatedClientSecret}</code>
                    </td>
                  </tr>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      REDIRECT_URI
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.redirectUri}</code>
                    </td>
                  </tr>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      Auth API URL
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.authApi}</code>
                    </td>
                  </tr>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      Drive API URL
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.driveApi}</code>
                    </td>
                  </tr>
                  <tr className="border-y bg-white dark:border-gray-700 dark:bg-gray-900">
                    <td className="bg-gray-50 px-3 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      API Scope
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-gray-500 dark:text-gray-400">
                      <code className="font-mono text-sm">{apiConfig.scope}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="py-1 text-sm font-medium">
              <FontAwesomeIcon icon="exclamation-triangle" className="mr-1 text-yellow-400" /> 如果发现任何缺失或不正确的配置，请重新配置{' '}
              <code className="font-mono text-xs">/config/api.config.js</code> 并重新部署此实例。
            </p>

            <div className="mb-2 mt-6 text-right">
              <button
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                onClick={() => {
                  router.push('/onedrive-oauth/step-2')
                }}
              >
                <span>{'前往 OAuth 授权'}</span> <FontAwesomeIcon icon="arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
