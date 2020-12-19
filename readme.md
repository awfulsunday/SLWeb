nuxt的数据传递：js内部函数->mapactions函数->store的js函数->services的js函数->api的route的js函数->后端
nuxt的目录结构：
    assets：静态资源
    components：组件
    layouts：布局，公用结构如导航栏
    middleware：方法函数，在页面加载渲染前运行，文件的名称将成为中间件名称
    pages：页面，约束url跳转
    plugins：第三方库
    static：静态资源，可进行webpack
    store：vuex状态树文件



地址：http://121.196.41.4/

后台：http://121.196.41.4/admin

超级用户账号：admin / root （可登录后台）

?                           admin2 / root

普通用户账号：user1 / !QWEqwe123

?                           user2 / !QWEqwe123

用户角色说明：

- 超级用户：可创建项目，包括管理员功能
- 管理员：对某项目具有所有控制权（包括导入导出数据，设置label，为项目分配用户角色，设置指南，统计）
- 标注员：只可“开始标注”
- 审查员：“开始标注”与将数据条目设置为 已/未 完成



存在问题：

- 刷新加载很慢
- 导入数据需要utf-8格式，且不能有空行
- 指南使用tui-editor模板，如果输入太快，光标会自动移动到末尾（没有思路修改）
- 假设admin为超级用户，为其在project1设置某角色再删除该设置，admin将失去对该项目的控制权
- 未测试并发
- 使用local storage，同一浏览器两个标签页登录不同账号可能出现bug