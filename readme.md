- # FUNCTIONS

  |          | 账号   | 密码       |
  | -------- | ------ | ---------- |
  | 超级用户 | admin  | root       |
  |          | admin2 | root       |
  | 普通用户 | user1  | !QWEqwe123 |
  |          | user2  | !QWEqwe123 |

  用户角色说明：

  - 分为超级用户和普通用户
  - 超级用户是命令行创建的用户，可进入后台
  - 所有用户可被分配管理员/标注员/审查员三种角色

  |                             | 超级用户 | 管理员 | 审查员 | 标注员 |
  | --------------------------- | -------- | ------ | ------ | ------ |
  | 创建/删除项目               | √        |        |        |        |
  | 导入/导出数据               | √        | √      |        |        |
  | 设置标签                    | √        | √      |        |        |
  | 为项目分配用户角色          | √        | √      |        |        |
  | 修改指南                    | √        | √      |        |        |
  | 查看统计数据                | √        | √      |        |        |
  | 标注                        | √        | √      | √      |        |
  | 将标注条目设置为 已/未 完成 | √        | √      | √      | √      |

  # PROBLEMS

  - 刷新加载很慢（可能是服务器性能太差或未将veu打包或axios方法问题）
  - 导入数据需要utf-8格式，且不能有空行
  - 指南使用tui-editor模板，如果输入太快，光标会自动移动到末尾（没有思路修改）
  - 假设admin为超级用户，为其在project1设置某角色再删除该设置，admin将失去对该项目的控制权
  - 只测试了两个浏览器的并发，若label条目被其他用户增/删，需要重新进入“数据”列表或刷新页面以重新显示
  - 使用localStorage，同一浏览器两个标签页可以登录不同账号，但是刷新后都会变成最后登录账号

  # RUN

  ## fontend

  ```shell
  # 在frontend文件夹下
  
  # 安装框架与依赖
  npm install --save nuxt
  
  # tui-editor存在问题，右侧栏目宽度只有50px，参考https://github.com/nhn/tui.editor/issues/923，修改tui-editor.js中19616行代码
  
  # nuxt.config.js中设置server和proxy
  
  # 运行
  npm run dev
  ```

  ## backend

  ```shell
  # 在backend文件夹下
  
  # 可先删除db.sqlit3文件
  # 数据库迁移
  python manage.py migrate
  
  # 创建角色
  python manage.py create_roles
  
  # 创建超级用户
  python manage.py create_admin
  
  # 复制静态文件到static文件夹，否则admin后台无样式文件
  python manage.py collectstatic
  # 静态文件被复制到staticfiles文件夹，可直接将该文件夹重命名为static
  
  # 运行
  python manage.py runserver
  ```

  ## nginx

  ```shell
  server {
      listen 80;
      server_name    yourserver;
  
      gzip            on;
      gzip_types      text/plain application/xml text/css application/javascript;
      gzip_min_length 1000;
  
      charset utf-8;
  
      add_header X-Frame-Options DENY;
      add_header X-Content-Type-Options nosniff;
      add_header X-XSS-Protection "1; mode=block";
  
      location / {
          proxy_pass http://localhost:3000/;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
      }
  
      location /v1/ {
          proxy_pass http://localhost:3000/v1/;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_redirect off;
          proxy_read_timeout  300;
      }
  
      location /admin/ {
          proxy_pass http://localhost:8000/admin/;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_redirect off;
      }
  
      location = /admin {
          absolute_redirect off;
          return 301 /admin/;
      }
  
      location /swagger/ {
          proxy_pass http://localhost:8000/swagger/;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_redirect off;
      }
  
      location = /swagger {
          absolute_redirect off;
          return 301 /swagger/;
      }
  
      location /static/ {
          root /home/mydoccano/backend/;
          break;
      }
  }
  
  server_tokens off;
  ```

  

  原作者：https://github.com/doccano