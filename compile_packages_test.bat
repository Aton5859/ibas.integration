@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo            compile_packages_test.bat
echo                     by niuren.zhu
echo                           2017.12.05
echo  ˵����
echo     1. ��װapache-maven�����ص�ַhttp://maven.apache.org/download.cgi��
echo     2. ��ѹapache-maven��������ϵͳ����MAVEN_HOMEΪ��ѹ�ĳ���Ŀ¼��
echo     3. ���PATH������%%MAVEN_HOME%%\bin�������JAVA_HOME�����Ƿ���ȷ��
echo     4. ������ʾ������mvn -v ��鰲װ�Ƿ�ɹ���
echo     5. �˽ű����ڱ������war����
echo     6. ����ʱ�볢��������compile_packages.bat��
echo ****************************************************************************
REM ���ò�������
SET WORK_FOLDER=%~dp0

echo --��ǰ������Ŀ¼��[%WORK_FOLDER%]
if not exist %WORK_FOLDER%release md %WORK_FOLDER%release
REM ������԰�
if exist %WORK_FOLDER%ibas.integration.service\pom.test.xml (
  call "%MAVEN_HOME%\bin\mvn" clean package -Dmaven.test.skip=true -f %WORK_FOLDER%ibas.integration.service\pom.test.xml 
  if exist %WORK_FOLDER%ibas.integration.service\target\ibas.integration.test*.war copy /y %WORK_FOLDER%ibas.integration.service\target\ibas.integration.test*.war %WORK_FOLDER%release
)

