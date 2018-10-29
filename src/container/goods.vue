<template>
    <div>
      <introduce class="lintr_bottom" :text="text" :introduceObj="introduceObj" :openStyle="true"></introduce>
      <public-temp :aboutzhObj="aboutzhObj" :isFontWei="false" :isReservaPage="true" class=""></public-temp>
      <temp-footer class="footer-top"></temp-footer>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import publicTemp from '@/components/publicTemp/publicTemp'
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
import {etArticlesContent, getShareToken} from '@/api/index'
import { wxShareTemp, againUrl } from '../utils/wx_share'

export default {
  name: "aboutzh",
  data() {
    return {
      introduceObj: {},
      text: 'Instructions for exhibitors',
      aboutzhObj: {
        navList: ["参展须知", "展位说明", "展位预订"],
        textList: [
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            isTableType: false,
            footerTxt: '本须知最终解释权归博览会组委会',
            text: [
              {title: '1、', txt: '搭建及展览期间国家会议中心提供各类午餐，搭建及参展人员可到指定位置购买并就餐，外部餐饮、盒饭一律严禁进入。'},
              {title: '2、', txt: '国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '3、', txt: '车辆停放请遵守国家会议中心有关规定,听从现场有关人员指挥,按点停放。'},
              {title: '4、', txt: '参展商在中国境内的商业活动须严格遵守中国现行的有关政策、法律及规定。'},
              {title: '5、', txt: '参展商在博览会期间须服从组委会的统一安排和指挥，并给予主办者以充分理解及配合。'},
              {title: '6、', txt: '参展商的商业行为不得与组委会发生直接或间接的冲突，从而损害主办单位的权益。未经组委会许可，任何参展商不得设计、发售博览会题材、图案的纪念性产品。'},
              {title: '7、', txt: '未经组委会书面批准，不得擅自出售、转让或转租摊位。经组委会批准后， 每位参展商只可与一个其他展商共用所租摊位。'},
              {title: '8、', txt: '不允许在现场展示或销售伪造钱币；1949 年 10 月1 日后台湾钱币、章及相关衍生产品；无法鉴定的币章等非法商品及与博览会内容无关的商品。'},
              {title: '9、', txt: '场馆内禁止私人贩卖及不适当的促销活动，禁止发放、放置有政治性问题及哗众的物品。'},
              {title: '10、', txt: '现场商品的订价应合理并参考市价，严禁暴利。'},
              {title: '11、', txt: '在销售过程中一旦出现纠纷，应妥善处理或通过组委会来调解，确保买卖双方的利益不受损害。'},
              {title: '12、', txt: '所有参展商应在展前自行办妥有关人身财产保险事宜。在展会期间要特别注意安全，妥善保管个人财产、物品，如因自身原因发生意外，主办单位将不承担责任。'},
              {title: '13、', txt: '博览会结束前，任何参展商未经组委会书面许可不得擅自撤离展位。'},
              {title: '14、', txt: '所有涉及博览会的媒体宣传和商业广告需经组委会审批，避免出现错误、失实、夸大、不合理等内容。'},
              {title: '15、', txt: '参展商须向海关如实申报展品的品种、数量、价格及面值，并安实际的销售额缴纳税金。'},
              {title: '16、', txt: '参展商须确保所有租用物品无缺损，如有缺损，照价赔偿。'},
              {title: '17、', txt: '严禁展商在展场内摆放“黄、赌、毒”、假冒、伪劣、侵权商品以及公安部门管制物品等展品。凡展出物品违反国家法律规定的，一律没收，展位费不退，由此而引起的一切后果和损失均由违反者自负。'},
              {title: '18、', txt: '以下相关物品禁止带入场馆：枪支、弹药、武器、刀剑、易燃易爆物品、有毒物品、毒品、放射性物质和其它危险品、命令禁止进口的物品、侵犯专利权的物品、各类动物和宠物及任何被政府有关部门禁止的物品。'},
              {title: '19、', txt: '严禁对通道、太平门、应急灯、灭火器、消防喷淋装置火警报警及其它安全装置、设施进行改造或移动。如有违反造成的后果由违反者承担，造成重大损失或人员伤害的交由公安机关处理。'},
              {title: '20、', txt: '禁止在场馆内寻衅滋事、打架、斗殴；贵重物品、现金请自行负责保管，遇有大额交易可到组委会指定地点进行清点，若因自身原因造成的物品损坏、丢失由参展单位或个人自行负责。'},
              {title: '21、', txt: '场馆内严禁烟火。凡特装展位必须使用防水线、护套线；严禁使用热光源（碘钨灯、太阳灯）、电感整流器；所有装修木料必须按公安消防要求进行防火处理（涂防火涂料等），未作处理的一经发现严禁使用，并为此发生的相关损失由参展单位承担。'},
              {title: '22、', txt: '仅允许使用非残留性的单面或双面胶带，不允许在展厅内使用背面有粘性的示意图或宣传品，不允许在地机、柱面或墙面上使用粘胶物或粘接剂。'},
              {title: '23、', txt: '任何参展单位或参展个人违反上述规定的行为，组委会将严肃对待和处理， 给场馆或组办单位造成损失的由违反单位或个人承担。'}
            ]
          },
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            isTableType: true, // 是否启用table表格
            text: [
              {title: '', txt: '北京新文时代金币文化传播有限公司是中国金币总公司的子公司。中国金币总公司是中国人民银行的直属企业。北京国际钱币博览会围绕并服务于中央银行职能及国家货币发行政策，以普及人民币知识，弘扬金币文化为主旨，培育全民爱护人民币、培育成熟的金银币收藏投资理念为己任，发展与促进中外钱币文化交流，为国际钱币企业搭建交流平台，促进钱币产品国际交融，展示和塑造中国钱币品牌的良好形象。'}
            ]
          },
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            isTableType: false,
            text: [
              {title: '', txt: '北京国际钱币博览会由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合主办的专业盛会。展会围绕并服务于中央银行职能及国家货币发行政策，以普及人民币知识，弘扬金币文化为主旨，为国内外钱币企业搭建交流平台。'}
            ]
          }
        ]
      },
    }
  },
  created() {
    againUrl(this.$route.path)
    this.context()
  },
  activated() {
    document.title = '展商专区';
  },
  mounted() {
    this.shareWxGoods()
  },
  methods: {
    // 分享
    shareWxGoods() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国际钱币博览会展商专区'})
      }).catch(err => {
        console.log(err)
      })
    },
    context() {
      etArticlesContent({articlesCode: 'ZSXZ'}).then(res => {
        if (res.data.returnCode === '0000') {
          this.introduceObj = res.data.returnData
        }
      })
    }
  },
  components: {
    tabBar,
    introduce,
    publicTemp,
    tempFooter
  }
}
</script>

<style scoped lang="stylus">
  .lintr_bottom
    margin-bottom 0.29rem
  .footer-top
    margin-top 0.57rem
</style>
