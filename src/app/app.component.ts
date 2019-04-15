import { Component } from '@angular/core';

import { Article } from './article/article.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  articles:Article[];   // <-- component property
  o :Observable<Article[]>;

  constructor(public http: HttpClient){
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];

    this.http.post<Article>("https://jsonplaceholder.typicode.com/posts", {title: "titolo", link: "link", votes: 0}).subscribe(data => {
      console.log(data);
        this.articles.push(data);
    });

    this.http.get<Article[]>("https://jsonplaceholder.typicode.com/posts").subscribe(data => {
      var mydata = JSON.parse(JSON.stringify(data))
      mydata.forEach(data => {
        //console.log(new Article(data.title, data.body, data.Id);
        this.articles.push(new Article(data.title, data.body, data.Id));
      })
    });
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}
