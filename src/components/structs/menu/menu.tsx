"use client";

import style from "./menu.module.scss";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

export type DataStructMenu = {
  children: React.ReactNode;
  items?: ItemType<MenuItemType>[];
};

export default function StructMenu({ children, items }: DataStructMenu) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout id={style.LayoutStructMenu}>
      <Layout.Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={style.sider}
      >
        <Button
          className={style.collapseButton}
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Menu
          className={style.menu}
          mode="vertical"
          defaultSelectedKeys={["1"]}
        >
          {/* {items &&
            items.map(({ icon, key, label }, index) => (
              <Menu.Item key={key} label={label} icon={icon}></Menu.Item>
            ))} */}
        </Menu>
      </Layout.Sider>
      <Layout> 
        <Layout.Content className={style.content}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
