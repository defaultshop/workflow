import "@/api/request";

// ------ 提交预报名信息
export const post_SubmitFrontChildrenInfo = data =>
  "EOL/SchoolRegisterInfo/SubmitFrontChildrenInfo".post(data);

//  ------ step1
export const post_AddChildrenInfo = data =>
  "EOL/SchoolRegisterInfo/AddChildrenInfo".post(data); //  提交儿童信息

export const get_AreaList = params => "EOL/AreaInfo/AreaList".get({ params });

//  ------ step2
export const post_AddParentsInfo = data =>
  "EOL/SchoolRegisterInfo/AddParentsInfo".post(data); //  提交家长信息
export const post_AddPersonnelInfo = data =>
  "EOL/SchoolRegisterInfo/AddPersonnelInfo".post(data); //   提交高层次人才信息
export const post_AddBookInfo = data =>
  "EOL/SchoolRegisterInfo/AddBookInfo".post(data); //  添加附件信息
export const get_GetEnableList = params =>
  "EOL/SchoolInfo/GetEnableList".get({ params }); //  返回学校列表
export const post_AddSchoolInfo = data =>
  "EOL/SchoolRegisterInfo/AddSchoolInfo".post(data); //  添加学校信息
export const post_SubmitAndVerification = data =>
  "EOL/SchoolRegisterInfo/SubmitAndVerification".post(data); //  提交效验信息
export const post_AddHouseInfo = data =>
  "EOL/SchoolRegisterInfo/AddHouseInfo".post(data); //  提交房产信息
export const post_AddEnterpriseInfo = data =>
  "EOL/SchoolRegisterInfo/AddEnterpriseInfo".post(data); //  提交企业信息
export const post_AddCompanyInfo = data =>
  "EOL/SchoolRegisterInfo/AddCompanyInfo".post(data); //  提交单位信息
export const UnSubmittedSchoolRegisterInfo = data =>
  "EOL/SchoolRegisterInfo/UnSubmittedSchoolRegisterInfo".post(data); //  提交单位信息

// ------ step3
export const post_SchoolRegisterInfo = data =>
  "EOL/SchoolRegisterInfo/SchoolRegisterInfo".post(data); //  获取报名信息
export const post_SchoolRegisterInfoList = () =>
  "EOL/SchoolRegisterInfo/SchoolRegisterInfoList".post(); //  获取报名信息列表
export const post_Send = data => "EOL/SmsService/Send".post(data); //  发送短信
export const post_SubmitData = data =>
  "EOL/SchoolRegisterInfo/SubmitData".post(data); //  提交信息

export const get_Map = params => "EOL/File/Map".get({ params }); //  获取文件信息

export const GetSchoolRegisterInfoAuditList = params =>
  "EOL/SchoolRegisterInfo/GetSchoolRegisterInfoAuditList".get({ params });

export const GetSchoolRegisterInfo = params =>
  "EOL/SchoolRegisterInfo/GetSchoolRegisterInfo".get({ params });
