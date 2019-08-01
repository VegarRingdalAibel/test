$fsx.f[36]=(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=$fsx.r(15),i=$fsx.r(16),s=$fsx.r(25);$fsx.r(27),i.registerCustomElement("profile-article-route",class extends HTMLElement{constructor(){super(),this.articles=[],this.currentPage=1,this.limit=10,this.articleService=i.getContext(s.ArticleService),this.eventAggregator=i.getContext(i.EventAggregator)}activate(t,e){return this.username=e.name,this.getArticles()}async getArticles(){const t={limit:this.limit,offset:this.limit*(this.currentPage-1),author:this.username},e=await this.articleService.getList("all",t);this.articles.splice(0,this.articles.length),this.articles.push(...e.articles),this.totalPages=Array.from(new Array(Math.ceil(e.articlesCount/this.limit)),(t,e)=>e+1),this.eventAggregator.publish("articleChange"),this.render()}render(){return r.html`
                <article-list
                    .articles=${this.articles}
                    .totalPages=${this.totalPages}
                    .pageNumber=${this.pageNumber}
                    .currentPage=${this.currentPage}
                    set-page-cb.trigger="setPageTo(pageNumber)"
                ></article-list>
            `}})};