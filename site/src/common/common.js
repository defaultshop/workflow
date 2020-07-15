/*

*/

export const schoolTypeFormat = schoolType => {
  let schoolTypeFormat;
  switch (schoolType) {
    case 1:
      schoolTypeFormat = "幼儿园";
      break;
    case 2:
      schoolTypeFormat = "小学";
      break;
    case 4:
      schoolTypeFormat = "中学";
      break;
  }

  return schoolTypeFormat;
};

/*

*/

export const schoolRegisterTypeFormat = schoolRegisterType => {
  let schoolRegisterTypeFormat;
  switch (schoolRegisterType) {
    case 1:
      schoolRegisterTypeFormat = "正式报名";
      break;
    case 2:
    case 4:
      schoolRegisterTypeFormat = "预报名";
      break;
    case 8:
    case 16:
    case 32:
      schoolRegisterTypeFormat = "正式报名";
      break;
  }

  return schoolRegisterTypeFormat;
};

/*
    RegisterState: [
        0: {id: 1, value: "未提交"}
        1: {id: 2, value: "审核中"}
        2: {id: 4, value: "审核未通过"}
        3: {id: 8, value: "审核通过"}
        4: {id: 16, value: "重新提交"}
    ]  
*/

export const registerStateEnum = registerState => {
  let registerStateFormat;
  switch (registerState) {
    case 1:
      registerStateFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .RegisterState[0].value;
      break;
    case 2:
      registerStateFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .RegisterState[1].value;
      break;
    case 4:
      registerStateFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .RegisterState[2].value;
      break;
    case 8:
      registerStateFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .RegisterState[3].value;
      break;
    case 16:
      registerStateFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .RegisterState[4].value;
      break;
  }

  return registerStateFormat;
};

/*
    VerificationResultType: [
        0: {id: 1, value: "未获取到交易数据源"}
        1: {id: 2, value: "校验不符合"}
        2: {id: 4, value: "校验通过"}
        3: {id: 8, value: "更新中"}
    ]
*/

export const VerificationResultTypeEnum = verificationResultType => {
  let verificationResultTypeFormat;
  switch (verificationResultType) {
    case 1:
      verificationResultTypeFormat = JSON.parse(
        sessionStorage.getItem("AllEnum")
      ).VerificationResultType[0].value;
      break;
    case 2:
      verificationResultTypeFormat = JSON.parse(
        sessionStorage.getItem("AllEnum")
      ).VerificationResultType[1].value;
      break;
    case 4:
      verificationResultTypeFormat = JSON.parse(
        sessionStorage.getItem("AllEnum")
      ).VerificationResultType[2].value;
      break;
    case 8:
      verificationResultTypeFormat = JSON.parse(
        sessionStorage.getItem("AllEnum")
      ).VerificationResultType[3].value;
      break;
  }
  return verificationResultTypeFormat;
};

/*
    VerificationType: [
        0: {id: 1, value: "儿童信息"}
        1: {id: 2, value: "家长信息"}
        2: {id: 4, value: "房产信息"}
        3: {id: 8, value: "企业信息"}
        4: {id: 16, value: "单位信息"}
    ]
*/

export const VerificationTypeEnum = verificationType => {
  let verificationTypeFormat;

  switch (verificationType) {
    case 1:
      verificationTypeFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .VerificationType[0].value;
      break;
    case 2:
      verificationTypeFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .VerificationType[1].value;
      break;
    case 4:
      verificationTypeFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .VerificationType[2].value;
      break;
    case 8:
      verificationTypeFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .VerificationType[3].value;
      break;
    case 16:
      verificationTypeFormat = JSON.parse(sessionStorage.getItem("AllEnum"))
        .VerificationType[4].value;
      break;
  }

  return verificationTypeFormat;
};

/*
    正式报名所有枚举
*/
export const allOfficialConfig = () => {
  let arr = [
    {
      verificationType: 1, //  儿童信息的 verificationType
      description: "填写儿童信息", //  描述
      explain: "请填写儿童相关信息", //  填写说明
      success: "已填写儿童信息", //  验证成功的文本
      fail: "儿童信息填写失败", //  失败的文本
      name: "ChildFill", //  路由跳转的 name
      judge_name: "childIsFill", //  用来判断当前信息是否填写的字段
      index: 0, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      is_success: false,
      noticeType: 32
    },
    {
      verificationType: 2,
      description: "填写家长信息",
      explain: "请填写家长相关信息",
      success: "已填写家长信息",
      fail: "家长信息与公安数据不一致",
      name: "ParentFill",
      judge_name: "parentsIsFill",
      index: 1, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 64
    },
    {
      verificationType: 4,
      description: "填写房产信息",
      explain: "请填写房产相关信息",
      success: "已填写房产信息",
      fail: "房产信息填写失败",
      name: "HouseFill",
      judge_name: "houseIsFill",
      index: 2, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 256
    },
    {
      verificationType: 8,
      description: "填写企业信息",
      explain: "请填写企业相关信息",
      success: "已填写企业信息",
      fail: "企业信息填写失败",
      name: "EnterpricesFill",
      judge_name: "enterpriseIsFill",
      index: 3, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 512
    },
    {
      verificationType: 16,
      description: "填写单位信息",
      explain: "请填写单位相关信息",
      success: "已填写单位信息",
      fail: "单位信息填写失败",
      name: "CompanyFillOS",
      judge_name: "companyIsFill",
      index: 4, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 1024
    },
    {
      verificationType: -1,
      description: "上传附件材料",
      explain: "请上传附件相关材料",
      success: "已上传",
      fail: "附件上传失败",
      name: "FileFillO",
      judge_name: "bookIsFill",
      index: 5, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 128
    },
    {
      verificationType: -1,
      description: "上传附件材料",
      explain: "请上传附件相关材料",
      success: "已上传",
      fail: "附件上传失败",
      name: "FileFillT",
      judge_name: "bookIsFill",
      index: 6, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 128
    },
    {
      verificationType: -1,
      description: "上传附件材料",
      explain: "请上传附件相关材料",
      success: "已上传",
      fail: "附件上传失败",
      name: "FileFillF",
      judge_name: "bookIsFill",
      index: 7, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 128
    },
    {
      verificationType: -1,
      description: "上传附件材料",
      explain: "请上传附件相关材料",
      success: "已上传",
      fail: "附件上传失败",
      name: "FileFillOther",
      judge_name: "bookIsFill",
      index: 8, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 128
    },
    {
      verificationType: -1,
      description: "填报志愿学校",
      explain: "请填报志愿学校",
      success: "已填写",
      fail: "填写失败",
      name: "SchoolFill",
      judge_name: "schoolIsFill",
      index: 9, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 2048
    },
    {
      verificationType: 16,
      description: "填写单位信息",
      explain: "请填写单位相关信息",
      success: "已填写单位信息",
      fail: "单位信息填写失败",
      name: "CompanyFillTT",
      judge_name: "companyIsFill",
      index: 10, //  下标，暂时没用到
      is_fill: false, //  当前是否已填写
      noticeType: 1024
    }
  ];

  return arr;
};

/*
    正式报名配置
*/
export const officialConfig = (res, arr) => {
  arr[0].is_fill = res.result.childIsFill;
  arr[1].is_fill = res.result.parentsIsFill;
  arr[2].is_fill = res.result.houseIsFill;
  arr[3].is_fill = res.result.enterpriseIsFill;
  arr[4].is_fill = res.result.companyIsFill;
  arr[5].is_fill = res.result.bookIsFill;
  arr[6].is_fill = res.result.bookIsFill;
  arr[7].is_fill = res.result.bookIsFill;
  arr[8].is_fill = res.result.bookIsFill;
  arr[9].is_fill = res.result.schoolIsFill;

  let arrIndex = [];
  let arr_stepData = [];

  //  步骤数据赋值
  switch (sessionStorage.getItem("businessTypes")) {
    case "1":
      arr_stepData = [arr[0], arr[1], arr[5], arr[9]];
      arrIndex = [
        arr[0].noticeType,
        arr[1].noticeType,
        arr[5].noticeType,
        arr[9].noticeType
      ];
      break;
    case "2":
      arr_stepData = [arr[0], arr[1], arr[6], arr[9]];
      arrIndex = [
        arr[0].noticeType,
        arr[1].noticeType,
        arr[6].noticeType,
        arr[9].noticeType
      ];
      break;
    case "4":
      arr_stepData = [arr[0], arr[2], arr[1], arr[7], arr[9]];
      arrIndex = [
        arr[0].noticeType,
        arr[2].noticeType,
        arr[1].noticeType,
        arr[7].noticeType,
        arr[9].noticeType
      ];
      break;
    case "8":
      arr_stepData = [arr[0], arr[1], arr[3], arr[7], arr[9]];
      arrIndex = [
        arr[0].noticeType,
        arr[1].noticeType,
        arr[3].noticeType,
        arr[7].noticeType,
        arr[9].noticeType
      ];
      break;
    case "16":
      arr_stepData = [arr[0], arr[1], arr[4], arr[8], arr[9]];
      arrIndex = [0, 1, 4, 8, 9];
      arrIndex = [
        arr[0].noticeType,
        arr[1].noticeType,
        arr[4].noticeType,
        arr[8].noticeType,
        arr[9].noticeType
      ];
      break;
    case "32":
      arr_stepData = [arr[0], arr[1], arr[10], arr[7], arr[9]];
      arrIndex = [0, 1, 10, 8, 9];
      arrIndex = [
        arr[0].noticeType,
        arr[1].noticeType,
        arr[10].noticeType,
        arr[7].noticeType,
        arr[9].noticeType
      ];
      break;
    case "64":
      break;
  }

  return {
    arr: arr,
    arr_stepData: arr_stepData,
    arrIndex: arrIndex
  };
};
