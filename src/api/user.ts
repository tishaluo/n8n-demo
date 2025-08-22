import request from './request';


export interface RecordItem {
  id: number;
  name: string;
  time: string;
  // 其他字段
}



export function getLogs(): Promise<RecordItem> {
  return request({
    url: '/api/twitterInteractions/log',
    method: 'get',
  });
}

// 新增：根据id获取单条twitter interaction
export function getInteractionById(id: number | string) {
  return request({
    url: `/api/twitterInteractions/${id}`,
    method: 'get',
  });
}