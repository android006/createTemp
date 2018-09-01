import Mock from 'mockjs'

export default {
  // 项目阶段
  'GET /jnhj/operationPlatform/annualOverview': (req, res) => {
    let data = Mock.mock({
      lastYear: [
        {
          name: 'qianqi',
          'value|1-49': 100,
        }, {
          name: 'shigong',
          'value|1-49': 100,
        }, {
          name: 'tinggong',
          'value|1-49': 100,
        }, {
          name: 'shouwei',
          'value|1-49': 100,
        }, {
          name: 'jungong',
          'value|1-49': 100,
        }, {
          name: 'yanshou',
          'value|1-49': 100,
        },],
      thisYear: [
        {
          name: 'qianqi',
          'value|50-99': 100,
        }, {
          name: 'shigong',
          'value|50-99': 100,
        }, {
          name: 'tinggong',
          'value|50-99': 100,
        }, {
          name: 'shouwei',
          'value|50-99': 100,
        }, {
          name: 'jungong',
          'value|50-99': 100,
        }, {
          name: 'yanshou',
          'value|50-99': 100,
        },],
      rate: [40.42]
    });
    setTimeout(() => {
      res.send({ret: data, rc: 0});
    }, 1000);
  },
}
