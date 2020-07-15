// ------  公共接口

import "@/api/request";

export const get_allList = () => "EOL/Enum/GetAllList".get(); //  获取所有枚举常量

export const post_getNotice = data => "EOL/NoticeInfo/GetList".post(data); //  获取须知

export const post_uploadBase64 = data => "EOL/File/UploadForBase64".post(data); //  上传文件获取字符串id

export const post_Token = data => "EOL/Account/Login".post(data); //  登录

export const post_token = data => "EOL/Authorize/GetToken".post(data); //  获取token

export const GetBusinessPageImage = params =>
  "EOL/PageSettingInfo/GetBusinessPageImage".get({ params }); //  获取所有枚举常量
