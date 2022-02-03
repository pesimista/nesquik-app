import React from 'react'
import Head from 'next/head'
import { signInUserAndPassword } from '../lib/auth'
import { useUser } from '../lib/context'
import { Form, Input, Checkbox, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

async function updateUser(user) {
  try {
    await signInUserAndPassword(user.email, user.password)
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function LoginPage({ }) {
  const { user } = useUser()
  const router = useRouter()

  if (user) {
    router.push('/home')
  }

  function handleSubmit(value: any) {
    updateUser(value).then(() => router.push('/home'))
  }

  return (<>
    <Head>
      <title>Login</title>
    </Head>
    <div style={{ maxWidth: '440px', margin: '10px auto', border: '1px solid gray', padding: '5rem 3rem 3rem' }}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  </>)
}