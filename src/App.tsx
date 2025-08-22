import React, { useState, useEffect } from 'react';
import { Layout, List, Tabs, Table, Spin, message } from 'antd';
import './app.less';
import { getLogs, getInteractionById } from './api/user';

const { Sider, Content } = Layout;

interface RecordItem {
  id: number;
  name?: string;
  time?: string;
  startedAt?: string;
  stoppedAt?: string;
  finished?: boolean;
  // 你可以加其他需要的字段
}

interface QueryResult {
  // ...你的查询数据结构
}

interface CommentResult {
  // ...你的评论数据结构
}

const App: React.FC = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [recordsLoading, setRecordsLoading] = useState(true);

  const [queryResults, setQueryResults] = useState<QueryResult[]>([]);
  const [commentResults, setCommentResults] = useState<CommentResult[]>([]);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  // 获取执行记录
  useEffect(() => {
    setRecordsLoading(true);
    getLogs()
      .then(({data}: any) => {
        // 假设 data 是数组，字段名按后端实际调整
     
        setRecords(data);
        setRecordsLoading(false);
        if (data.length > 0) {
          setSelectedId(data[0].id); // 默认选中第一个
        }
      })
      .catch(() => {
        message.error('获取执行记录失败');
        setRecordsLoading(false);
      });
  }, []);

  // 获取查询、评论结果
  useEffect(() => {
    if (!selectedId) return;
    setLoadingQuery(true);
    setLoadingComment(true);

    getInteractionById(selectedId)
      .then((res: any) => {
        // 假设接口返回 { queryResults: [], commentResults: [] }
        setQueryResults(res || []);
        setCommentResults(res || []);
      })
      .catch(() => {
        message.error('获取详情失败');
        setQueryResults([]);
        setCommentResults([]);
      })
      .finally(() => {
        setLoadingQuery(false);
        setLoadingComment(false);
      });
  }, [selectedId]);

  // ...你的 queryColumns 和 commentColumns 不变...
// 查询结果表格列
const queryColumns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'displayName', key: 'displayName' },
  { title: '原文链接', dataIndex: 'permanentUrl', key: 'permanentUrl', render: (url: string) => <a href={url} target="_blank" rel="noopener noreferrer">链接</a> },
  { title: '点赞数', dataIndex: 'likes', key: 'likes' },
  { title: '评论数', dataIndex: 'replies', key: 'replies' },
  { title: '转发数', dataIndex: 'retweets', key: 'retweets' },
  {
    title: '内容',
    dataIndex: 'text',
    key: 'text',
    width: 220,
    ellipsis: {
      showTitle: false
    },
    render: (text: string) => (
      <span title={text} style={{ display: 'inline-block', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', verticalAlign: 'middle', cursor: 'pointer' }}>{text}</span>
    )
  },
  { title: '发布时间', dataIndex: 'date', key: 'date' },
];

// 评论结果表格列
const commentColumns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'displayName', key: 'displayName' },
  {
    title: '内容',
    dataIndex: 'text',
    key: 'text',
    width: 420,
    ellipsis: {
      showTitle: false
    },
    render: (text: string) => (
      <span title={text} style={{ display: 'inline-block', maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', verticalAlign: 'middle', cursor: 'pointer' }}>{text}</span>
    )
  },
  {
    title: '评论内容',
    dataIndex: 'comment',
    key: 'comment',
   
  },
  { title: '原文链接', dataIndex: 'permanentUrl', key: 'permanentUrl', render: (url: string) => <a href={url} target="_blank" rel="noopener noreferrer">链接</a> },
];
  return (
    <Layout style={{ background: '#fff', minHeight: 500 }}>
     <Sider width={240} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
  {recordsLoading ? (
    <Spin style={{ marginTop: 40 }} />
  ) : (
    <List
      header={<div style={{ fontWeight: 'bold', fontSize: 18, padding: '12px 0 8px 8px', letterSpacing: 2 }}>MCP执行记录</div>}
      dataSource={records}
      style={{ padding: '8px 0', background: '#f8fafc', height: '100%' }}
      renderItem={item => {
        let duration = 0;
        if (item.startedAt && item.stoppedAt) {
          duration = (new Date(item.stoppedAt).getTime() - new Date(item.startedAt).getTime()) / 1000;
        }
        const isSelected = item.id === selectedId;
        return (
          <List.Item
            style={{
              background: isSelected ? '#e6f7ff' : '#fff',
              borderRadius: 10,
              margin: '8px 12px',
              boxShadow: isSelected ? '0 2px 8px #bae7ff55' : '0 1px 4px #eee',
              border: isSelected ? '1.5px solid #1890ff' : '1px solid #f0f0f0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              padding: '14px 18px',
              fontWeight: isSelected ? 'bold' : 500,
              position: 'relative',
              minHeight: 64,
            }}
            onClick={() => setSelectedId(item.id)}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px #91d5ff55')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = isSelected ? '0 2px 8px #bae7ff55' : '0 1px 4px #eee')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 15, color: '#222', marginBottom: 2 }}>
                <span style={{ fontWeight: 600 }}>编号：</span>{item.id}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  color: item.finished ? '#52c41a' : '#f5222d',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 1
                }}>
                  {item.finished ? '成功' : '失败'}
                </span>
                <span style={{ color: '#999', fontSize: 12 }}>
                  耗时: {duration.toFixed(2)} 秒
                </span>
              </div>
            </div>
          </List.Item>
        );
      }}
    />
  )}
</Sider>
      <Content style={{ padding: 24 }}>
        <Tabs defaultActiveKey="query">
          <Tabs.TabPane tab="查询结果" key="query">
            <Table
              rowKey="id"
              columns={queryColumns.map(col => ({
                ...col,
                align: 'left',
                onCell: () => ({ style: { padding: 8 } })
              }))}
              dataSource={queryResults}
              size="small"
              pagination={false}
              loading={loadingQuery}
              bordered
              scroll={{ x: 'max-content' }}
              rowClassName={(_, idx) => idx % 2 === 0 ? 'zebra-row' : ''}
              style={{ borderRadius: 12, boxShadow: '0 2px 12px #e6f7ff55', overflow: 'hidden' }}
              onRow={() => ({
                onMouseEnter: e => (e.currentTarget.style.background = '#f0faff'),
                onMouseLeave: e => (e.currentTarget.style.background = '')
              })}
              title={() => null}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="评论结果" key="comment">
            <Table
              rowKey="id"
              columns={commentColumns.map(col => ({
                ...col,
                align: 'left',
                onCell: () => ({ style: { padding: 8 } })
              }))}
              dataSource={commentResults}
              size="small"
              pagination={false}
              loading={loadingComment}
              bordered
              scroll={{ x: 'max-content' }}
              rowClassName={(_, idx) => idx % 2 === 0 ? 'zebra-row' : ''}
              style={{ borderRadius: 12, boxShadow: '0 2px 12px #e6f7ff55', overflow: 'hidden' }}
              onRow={() => ({
                onMouseEnter: e => (e.currentTarget.style.background = '#f0faff'),
                onMouseLeave: e => (e.currentTarget.style.background = '')
              })}
              title={() => null}
            />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default App;