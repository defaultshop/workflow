
import { GetSchoolAll } from '@/api/other'

import childHeader from '@/view/components/Header.vue'
import childFooter from '@/view/components/Footer.vue'

export default {
    components: {
        "child-header": childHeader,
        "child-footer": childFooter,
    },
    data() {
        return {
            arr_data: [],
        }
    },
    async created() {
        let res = await GetSchoolAll();
        if (res.success) {
            this.arr_data = res.result;
        }
    }
}
