import { post_getNotice } from '@/api/common'
import { post_SchoolRegisterInfo } from '@/api/infoFill'

import childHeader from '@/view/components/Header.vue'
import childFooter from '@/view/components/Footer.vue'

export default {
    components: {
        "child-header": childHeader,
        "child-footer": childFooter,
    },
    data(){
        return {
            arr_remark: [],
            data_info: {}
        }
    },
    async created(){
        //  获取须知
        let res = await post_getNotice({
            schoolTypes: [sessionStorage.getItem('schoolRegisterType')],
            businessTypes: [sessionStorage.getItem('businessTypes')],
            noticeTypes: [8]
        })

        if(res.success){
            this.arr_remark = res.result;
        }

        //  获取信息
        let resInfo = await post_SchoolRegisterInfo({
            "cardId": this.$route.query.cardId,
            "schoolRegisterType": sessionStorage.getItem('schoolRegisterType'),
            "businessType": sessionStorage.getItem('businessTypes')
        })

        if(resInfo.success){
            this.data_info = resInfo.result;
        }
    },
}
