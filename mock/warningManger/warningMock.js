import Mock from 'mockjs'

export default {
  'GET alarmRecord/getAlarmRecordByPage': (req, res) => {
    let data = Mock.mock({
      rowCount: 100,
      loading: false,
      'items|10': [
        {
          alarmTime:'@date(2017-MM-dd HH:mm:ss)',
          'alarmContinuousTime|1-100': 1,
          alarmMsg: '@cname',
          deviceId: '@cname',
          factorCode: '@cname',
          id: '@cname',
          projectCompanyId: '@cname'
        }
      ]
    });
    setTimeout(() => {
      res.send({ret: data});
    }, 3000);
  },
}
