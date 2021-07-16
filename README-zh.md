## 系统简介
* 采用前后端分离的模式，前端框架选型vue-element-admin，后端代码地址 https://gitee.com/ningzxspace/exam-ning-springcloud-v1
* 后端采用Spring Boot、Spring Cloud & Alibaba、Mybatis-plus。
* 注册中心、配置中心选型Nacos，权限认证使用OAuth2。
<table>
    <tr>
        <td>后端代码地址</td>
        <td><a href="https://gitee.com/ningzxspace/exam-ning-springcloud-v1">https://gitee.com/ningzxspace/exam-ning-springcloud-v1</a></td>
    </tr>
    <tr>
        <td>前端代码地址</td>
        <td><a href="https://gitee.com/ningzxspace/exam-ning-web-v1">https://gitee.com/ningzxspace/exam-ning-web-v1</a></td>
    </tr>
</table>

## 部署文档
1. 下载后端代码【https://gitee.com/ningzxspace/exam-ning-springcloud-v1.git】。
2. 初始化数据库，数据库脚本文件在doc/sql目录，分别创建exam-ning-springcloud-exam和exam-ning-springcloud-user数据库，导入对应sql文件。 
3. 启动Nacos，下载Nacos，运行startup.cmd。参考：https://nacos.io/zh-cn/docs/quick-start.html
4. 启动Redis。参考：https://www.cnblogs.com/skmobi/p/11696620.html
5. 依次启动exam-ning-springcloud-gateway、exam-ning-springcloud-auth、exam-ning-springcloud-system-exam、exam-ning-springcloud-system-user。
6. 下载前端代码：https://gitee.com/ningzxspace/exam-ning-web-v1，安装依赖【npm install】，本地运行【npm run dev】。
7. 浏览器访问http://localhost:9528/，学生【student1/123456】、老师【teacher1/123456】、管理员【system/system】。

## 欢迎Star留言交流
