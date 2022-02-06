import React, { useEffect, useState } from "react"
import "./App.css"
import { DefaultLayout } from "./layout"

import { useSelector, useDispatch } from "react-redux"
import { github } from "@/redux/github/actions"
import { selectSearchedItems, selectFavorList } from "@/redux/github/selectors"

import { List, Card, Typography, Button } from "antd"

import { HeartOutlined, StarOutlined, ForkOutlined } from "@ant-design/icons"

const { Paragraph, Text } = Typography
function formatDate(date: Date) {
  let day = date.getDate().toString()
  let month = (date.getMonth() + 1).toString()
  const year = date.getFullYear()
  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`
  return `${year}-${month}-${day}`
}

const lastWeek = formatDate(
  new Date(new Date().setDate(new Date().getDate() - 7))
)

const Action = ({ text, icon }: { text: string; icon: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <div style={{ paddingLeft: "10px" }}>{text}</div>
      </div>
    </div>
  )
}

const Favor = ({ repoId, favorList }: { repoId: any; favorList: string[] }) => {
  const dispatch = useDispatch()
  const favorToggle = () => {
    dispatch(
      github.favorToggle({
        repoId,
      })
    )
  }

  return (
    <Button
      type="text"
      icon={
        <HeartOutlined
          style={{
            color: favorList.includes(repoId) ? "red" : "grey",
            fontSize: "16px",
          }}
        />
      }
      onClick={favorToggle}
    />
  )
}

function App() {
  const dispatch = useDispatch()
  const [state, setState] = useState("")

  async function getGithubRepo() {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:%3E${lastWeek}&sort=stars&order=desc`
    )
    const data = await response.json()
    setState(data)
  }

  const { result: searchResult, isLoading } = useSelector(selectSearchedItems)
  const favorList = useSelector(selectFavorList)
  console.log("🚀 ~ file: App.tsx ~ line 38 ~ App ~ searchResult", searchResult)

  useEffect(() => {
    dispatch(
      github.search({
        entity: "repositories",
        options: { q: `created:%3E${lastWeek}`, sort: "stars" },
      })
    )
    getGithubRepo()
  }, [])

  useEffect(() => {
    console.log("🚀 ~ file: App.tsx ~ line 9 ~ App ~ state", state)
  }, [state])

  return (
    <DefaultLayout>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={searchResult.items}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              title={item.full_name}
              extra={<Favor repoId={item.id} favorList={favorList} />}
              style={{ height: 280, position: "relative" }}
              actions={[
                <Action
                  text={
                    item.stargazers_count +
                    (item.stargazers_count > 1 ? " stars" : " stars")
                  }
                  key="star"
                  icon={<StarOutlined />}
                />,
                <Action
                  text={item.forks + (item.forks > 1 ? " forks" : " fork")}
                  key="fork"
                  icon={<ForkOutlined />}
                />,
              ]}
            >
              <p>
                Link : <a href={item.html_url}>{item.html_url}</a>
              </p>
              <Paragraph ellipsis={{ rows: 3 }}>
                description : {item.description}
              </Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </DefaultLayout>
  )
}

export default App
