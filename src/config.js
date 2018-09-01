/**
 * Created by wupeng
 */
export default {
  // 分页
  page: 1,
  rows: 10,
  size: 'small',
  // 提示信息style
  info: {
    delete: {
      success: '删除信息成功',
      error: '删除信息失败',
    },
    update: {
      success: '修改信息成功',
      error: '修改信息失败',
    },
    save: {
      success: '保存信息成功',
      error: '保存信息失败',
    },
  },
  publicUrl: 'http://api.envcloud.com.cn:8001/upload/',
  publicUrlAli: 'http://api.envcloud.com.cn:8001/upload/', // 用于正式环境图片查看
}
