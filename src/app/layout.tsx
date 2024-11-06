import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import theme from '../../config/themeConfig'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './globals.css'

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <ConfigProvider theme={theme}>
      <AntdRegistry>
        <div className='main-container'>
          <Header/>
          <main className='flex-grow'>{children}</main>
          <Footer/>
        </div>
       
        </AntdRegistry>
      </ConfigProvider>
    </body>
  </html>
);

export default RootLayout;
