- # FUNCTIONS

  |          | �˺�   | ����       |
  | -------- | ------ | ---------- |
  | �����û� | admin  | root       |
  |          | admin2 | root       |
  | ��ͨ�û� | user1  | !QWEqwe123 |
  |          | user2  | !QWEqwe123 |

  �û���ɫ˵����

  - ��Ϊ�����û�����ͨ�û�
  - �����û��������д������û����ɽ����̨
  - �����û��ɱ��������Ա/��עԱ/���Ա���ֽ�ɫ

  |                             | �����û� | ����Ա | ���Ա | ��עԱ |
  | --------------------------- | -------- | ------ | ------ | ------ |
  | ����/ɾ����Ŀ               | ��        |        |        |        |
  | ����/��������               | ��        | ��      |        |        |
  | ���ñ�ǩ                    | ��        | ��      |        |        |
  | Ϊ��Ŀ�����û���ɫ          | ��        | ��      |        |        |
  | �޸�ָ��                    | ��        | ��      |        |        |
  | �鿴ͳ������                | ��        | ��      |        |        |
  | ��ע                        | ��        | ��      | ��      |        |
  | ����ע��Ŀ����Ϊ ��/δ ��� | ��        | ��      | ��      | ��      |

  # PROBLEMS

  - ˢ�¼��غ����������Ƿ���������̫���δ��veu�����axios�������⣩
  - ����������Ҫutf-8��ʽ���Ҳ����п���
  - ָ��ʹ��tui-editorģ�壬�������̫�죬�����Զ��ƶ���ĩβ��û��˼·�޸ģ�
  - ����adminΪ�����û���Ϊ����project1����ĳ��ɫ��ɾ�������ã�admin��ʧȥ�Ը���Ŀ�Ŀ���Ȩ
  - ֻ����������������Ĳ�������label��Ŀ�������û���/ɾ����Ҫ���½��롰���ݡ��б��ˢ��ҳ����������ʾ
  - ʹ��localStorage��ͬһ�����������ǩҳ���Ե�¼��ͬ�˺ţ�����ˢ�º󶼻�������¼�˺�

  # RUN

  ## fontend

  ```shell
  # ��frontend�ļ�����
  
  # ��װ���������
  npm install --save nuxt
  
  # tui-editor�������⣬�Ҳ���Ŀ���ֻ��50px���ο�https://github.com/nhn/tui.editor/issues/923���޸�tui-editor.js��19616�д���
  
  # nuxt.config.js������server��proxy
  
  # ����
  npm run dev
  ```

  ## backend

  ```shell
  # ��backend�ļ�����
  
  # ����ɾ��db.sqlit3�ļ�
  # ���ݿ�Ǩ��
  python manage.py migrate
  
  # ������ɫ
  python manage.py create_roles
  
  # ���������û�
  python manage.py create_admin
  
  # ���ƾ�̬�ļ���static�ļ��У�����admin��̨����ʽ�ļ�
  python manage.py collectstatic
  # ��̬�ļ������Ƶ�staticfiles�ļ��У���ֱ�ӽ����ļ���������Ϊstatic
  
  # ����
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

  

  ԭ���ߣ�https://github.com/doccano