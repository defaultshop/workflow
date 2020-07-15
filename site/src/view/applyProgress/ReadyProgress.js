
import baseUrl from '@/api/env'
import { GetSchoolRegisterInfoAuditList, GetSchoolRegisterInfo } from '@/api/infoFill'
import childHeader from '@/view/components/Header.vue'
import childFooter from '@/view/components/Footer.vue'

export default {
    components: {
        "child-header": childHeader,
        "child-footer": childFooter,
    },
    data() {
        return {
            baseUrl: baseUrl,   //  接口前缀
            arr_img: [{
                title: '父亲单位营业执照',
                src: ''
            },
            {
                title: '父亲单位合同期限页',
                src: ''
            },
            {
                title: '父亲单位合同签字页',
                src: ''
            },
            {
                title: '母亲单位营业执照',
                src: ''
            },
            {
                title: '母亲单位合同期限页',
                src: ''
            },
            {
                title: '母亲单位合同签字页',
                src: ''
            }],
            data_applyProgress: {},    //  报名类型
            arr_isTabShow: [false, false, false],   //  是否收缩内容
            is_submitSuccess: false,   //  是否成功提交
            arr_author: [],   //  审核流程
        }
    },
    async created(){

        let resAuthor = await GetSchoolRegisterInfoAuditList({
            id: this.$route.query.id
        })
        if(resAuthor.success){
            this.arr_author = resAuthor.result;

            for(let i in this.arr_author){
                switch(this.arr_author[i].registerState){
                    case 1:
                        this.arr_author[i].registerStateFormat = '未提交'
                        this.arr_author[i].registerStateColorClass = 'gray'
                        break
                    case 2:
                        this.arr_author[i].registerStateFormat = '已提交'
                        this.arr_author[i].registerStateColorClass = 'gray'
                        this.is_submitSuccess = true;
                        break
                    case 4:
                        this.arr_author[i].registerStateFormat = '审核未通过'
                        this.arr_author[i].registerStateColorClass = 'red'
                        break
                    case 16:
                        this.arr_author[i].registerStateFormat = '重新提交'
                        this.arr_author[i].registerStateColorClass = 'red'
                    break
                    case 8:
                        this.arr_author[i].registerStateFormat = '审核通过'
                        this.arr_author[i].registerStateColorClass = 'cyan'
                    break;
                }
            }
        }


        //  报名类型
        let res = await GetSchoolRegisterInfo({
            id: this.$route.query.id
        })
        
        if(res.success){

            this.data_applyProgress = res.result;
            // this.submitTimeText = this.data_applyProgress.submitTime.replace("T",' ')
            switch(this.data_applyProgress.registerState){
                case 1:
                    this.data_applyProgress.registerStateFormat = '未提交'
                    this.data_applyProgress.registerStateColorClass = 'gray'
                    break
                case 2:
                    this.data_applyProgress.registerStateFormat = '已提交'
                    this.data_applyProgress.registerStateColorClass = 'gray'
                    break
                case 4:
                    this.data_applyProgress.registerStateFormat = '审核未通过'
                    this.data_applyProgress.registerStateColorClass = 'red'
                    break
                case 16:
                    this.data_applyProgress.registerStateFormat = '重新提交'
                    this.data_applyProgress.registerStateColorClass = 'red'
                break
                case 8:
                    this.data_applyProgress.registerStateFormat = '审核通过'
                    this.data_applyProgress.registerStateColorClass = 'cyan'
                    this.is_submitSuccess = true;
                break;
            }
        }
    },
    methods: {

    }
}
