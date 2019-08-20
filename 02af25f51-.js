$fsx.f[45]=(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=$fsx.r(1),i=$fsx.r(16),r=$fsx.r(21),a=$fsx.r(30);$fsx.r(32);let l=class extends HTMLElement{constructor(){super(),this.articles=[],this.currentPage=1,this.limit=10,this.articleService=r.instance(a.ArticleService)}activate(t,e){return this.username=e.name,this.getArticles()}async getArticles(){const t={limit:this.limit,offset:this.limit*(this.currentPage-1),author:this.username},e=await this.articleService.getList("all",t);this.articles.splice(0,this.articles.length),this.articles.push(...e.articles),this.totalPages=Array.from(new Array(Math.ceil(e.articlesCount/this.limit)),(t,e)=>e+1),this.render()}render(){return i.html`
            <article-list
                .articles=${this.articles}
                .totalPages=${this.totalPages}
                .pageNumber=${this.pageNumber}
                .currentPage=${this.currentPage}
                .setPageCb=${t=>{this.currentPage=t,this.getArticles()}}
            ></article-list>
        `}};l=s.__decorate([r.customElement("profile-article-route")],l),e.default=l};
//# sourceMappingURL=02af25f51-.js.map