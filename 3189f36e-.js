$fsx.f[46]=(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=$fsx.r(1),r=$fsx.r(16),s=$fsx.r(21),a=$fsx.r(30);$fsx.r(32);let c=class extends HTMLElement{constructor(){super(),this.currentPage=1,this.limit=10,this.articles=[],this.articleService=s.instance(a.ArticleService)}activate(t,e){this.username=e.name,this.getArticles()}async getArticles(){const t={limit:this.limit,offset:this.limit*(this.currentPage-1),favorited:this.username},e=await this.articleService.getList("all",t);this.articles=[...e.articles],this.totalPages=Array.from(new Array(Math.ceil(e.articlesCount/this.limit)),(t,e)=>e+1)}render(){return r.html`
            <article-list
                .articles=${this.articles}
                .totalPages=${this.totalPages}
                .pageNumber=${this.pageNumber||1}
                .currentPage=${this.currentPage}
                .setPageCb=${t=>{this.currentPage=t,this.getArticles()}}
            ></article-list>
        `}};i.__decorate([s.property()],c.prototype,"articles",void 0),c=i.__decorate([s.customElement("profile-favorites-route")],c),e.default=c};
//# sourceMappingURL=3189f36e-.js.map