import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { getAuthPersonInfo, requestTokenWithAuthCode, sendTokenToServer } from '../../utils/oAuthHandler'
import { LoadingIcon } from '../../components/Loading'

export const runtime = 'experimental-edge'

export default function OAuthStep3({ accessToken, expiryTime, refreshToken, error, description, errorUri }) {
  const router = useRouter()
  const [expiryTimeLeft, setExpiryTimeLeft] = useState(expiryTime)

  useEffect(() => {
    if (!expiryTimeLeft) return

    const intervalId = setInterval(() => {
      setExpiryTimeLeft(expiryTimeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [expiryTimeLeft])

  const [buttonContent, setButtonContent] = useState(
    <div>
      <span>{'存储令牌'}</span> <FontAwesomeIcon icon="key" />
    </div>
  )
  const [buttonError, setButtonError] = useState(false)

  const sendAuthTokensToServer = async () => {
    setButtonError(false)
    setButtonContent(
      <div>
        <span>{'正在存储令牌'}</span> <LoadingIcon className="ml-1 inline h-4 w-4 animate-spin" />
      </div>
    )

    await sendTokenToServer(accessToken, refreshToken, expiryTime)
      .then(() => {
        setButtonError(false)
        setButtonContent(
          <div>
            <span>{'已存储！正在返回主页...'}</span> <FontAwesomeIcon icon="check" />
          </div>
        )
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch(_ => {
        setButtonError(true)
        setButtonContent(
          <div>
            <span>{'存储令牌出错'}</span> <FontAwesomeIcon icon="exclamation-circle" />
          </div>
        )
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{`OAuth Step 3 - ${siteConfig.title}`}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />

        <div className="mx-auto w-full max-w-5xl p-4">
          <div className="rounded bg-white p-3 dark:bg-gray-900 dark:text-gray-100">
            <div className="mx-auto w-52">
              <Image
                src="/images/fabulous-celebration.png"
                width={912}
                height={912}
                alt="fabulous celebration"
                priority
              />
            </div>
            <h3 className="mb-4 text-center text-xl font-medium">{'欢迎使用 onedrive-cf-index-ng 🎉'}</h3>

            <h3 className="mb-2 mt-4 text-lg font-medium">{'步骤 3/3：获取访问令牌和刷新令牌'}</h3>
            {error ? (
              <div>
                <p className="py-1 font-medium text-red-500">
                  <FontAwesomeIcon icon="exclamation-circle" className="mr-2" />
                  <span>{`哎呀，出现了问题：${error}。`}</span>
                </p>
                <p className="my-2 whitespace-pre-line rounded border border-gray-400/20 bg-gray-50 p-2 font-mono text-sm opacity-80 dark:bg-gray-800">
                  {description}
                </p>
                {errorUri && (
                  <p>
                    查看{' '}
                    <a
                      href={errorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      微软官方说明
                    </a>{' '}
                    了解错误信息详情。
                  </p>
                )}
                <div className="mb-2 mt-6 text-right">
                  <button
                    className="rounded-lg bg-gradient-to-br from-red-500 to-orange-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:grayscale dark:focus:ring-red-800"
                    onClick={() => {
                      router.push('/onedrive-oauth/step-1')
                    }}
                  >
                    <FontAwesomeIcon icon="arrow-left" /> <span>{'重新开始'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="py-1 font-medium">{'成功！API 返回了所需内容。'}</p>
                <ol className="py-1">
                  {accessToken && (
                    <li>
                      <FontAwesomeIcon icon={['far', 'check-circle']} className="text-green-500" />{' '}
                      <span>
                        {'已获取 access_token：'}
                        <code className="font-mono text-sm opacity-80">{`${accessToken.substring(0, 60)}...`}</code>
                      </span>
                    </li>
                  )}
                  {refreshToken && (
                    <li>
                      <FontAwesomeIcon icon={['far', 'check-circle']} className="text-green-500" />{' '}
                      <span>
                        {'已获取 refresh_token：'}
                        <code className="font-mono text-sm opacity-80">{`${refreshToken.substring(0, 60)}...`}</code>
                      </span>
                    </li>
                  )}
                </ol>

                <p className="py-1 text-sm font-medium text-teal-500">
                  <FontAwesomeIcon icon="exclamation-circle" className="mr-1" />{' '}
                  {'点击下方按钮后，这些令牌可能需要几秒钟才能生效。' +
                    '如果返回主页后仍看到欢迎页要求重新认证，' +
                    '请重新访问主页并强制刷新。'}
                </p>
                <p className="py-1">
                  {'最后一步，请在令牌过期前点击下方按钮将其永久存储，剩余时间：' +
                    `${Math.floor(expiryTimeLeft / 60)} 分 ${expiryTimeLeft - Math.floor(expiryTimeLeft / 60) * 60
                    } 秒。` +
                    '存储后，onedrive-cf-index-ng 将在网站上线后自动处理令牌刷新和更新。'}
                </p>

                <div className="mb-2 mt-6 text-right">
                  <button
                    className={`rounded-lg bg-gradient-to-br px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-4 ${buttonError
                      ? 'from-red-500 to-orange-400 focus:ring-red-200 dark:focus:ring-red-800'
                      : 'from-green-500 to-teal-300 focus:ring-green-200 dark:focus:ring-green-800'
                      }`}
                    onClick={sendAuthTokensToServer}
                  >
                    {buttonContent}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { authCode } = query

  console.log(authCode)

  // Return if no auth code is present
  if (!authCode) {
    return {
      props: {
        error: 'No auth code present',
        description: 'Where is the auth code? Did you follow step 2 you silly donut?',
      },
    }
  }

  const response = await requestTokenWithAuthCode(authCode)

  // If error response, return invalid
  if ('error' in response) {
    return {
      props: {
        error: response.error,
        description: response.errorDescription,
        errorUri: response.errorUri,
      },
    }
  }

  const { expiryTime, accessToken, refreshToken } = response

  // verify identity of the authenticated user with the Microsoft Graph API
  const { data, status } = await getAuthPersonInfo(accessToken)
  if (status !== 200) {
    return {
      props: {
        error: "Non-200 response from Microsoft Graph API",
        description: JSON.stringify(data)
      },
    }
  }
  if (data.userPrincipalName !== siteConfig.userPrincipalName) {
    return {
      props: {
        error: "Do not pretend to be the owner!",
        description: "Authenticated user: " + data.userPrincipalName + "\n" + "UserPrincipalName in your config should match the authenticated user here!"
      },
    }
  }

  return {
    props: {
      error: null,
      expiryTime,
      accessToken,
      refreshToken,
    },
  }
}
