
import '@/api/request'


// ------ 获取咨询电话
export const GetSchoolAll = () => 'EOL/SchoolInfo/AllList'.get();  

// ------ 获取业务页面政策解读
export const GetBusinessPagePolicyInterpretation = (params) => 'EOL/PageSettingInfo/GetBusinessPagePolicyInterpretation'.get({params});  

// ------ 获取业务页滚动内容
export const GetBusinessPageScrollingNotice = (params) => 'EOL/PageSettingInfo/GetBusinessPageScrollingNotice'.get({params});  

// ------ 获取业务页温馨提示
export const GetBusinessPageReminder = (params) => 'EOL/PageSettingInfo/GetBusinessPageReminder'.get({params});  
