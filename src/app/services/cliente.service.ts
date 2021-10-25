import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../clientes/cliente'; 
import{ catchError, map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};
@Injectable({
  providedIn: 'root'
})
export class ClienteService 
{
  public urlEndPoint = "http://localhost:8080/api/clientes";

  constructor(private httpClient: HttpClient, private router:Router) { }

  getClientes():Observable<Cliente[]>
  {
    return this.httpClient.get<Cliente[]>(this.urlEndPoint)
                          .pipe( /*operadores para cambiar formatos de los datos recibidos en el observable 
                            sin embargo se pueden reflejar estos cambios desde la vista en clientes*/
                            map(res =>
                            {
                              let clientes = res as Cliente[];
                              return clientes.map(cliente =>
                                {
                                  //cliente.nombre = cliente.nombre.toUpperCase();
                                  /*EEEE dd, MMMM yyyy para formato completo (full date es su equivalente)y escrito, dd-MM-yy para formato clasico y abreviado */
                                  //cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es');
                                  return cliente;
                                });
                            })
                            );
  }

  createCliente(cliente):Observable<Cliente>
  {
    //se le pasa httpoptions ya que es nuestra cabecera
    return this.httpClient.post(this.urlEndPoint, cliente, httpOptions)
                          .pipe(
                            /*
                              para obtrener solo el cliente sin el mensaje enviado 
                              se implementa el map
                            */
                            map((res: any) => res.cliente as Cliente),
                            catchError(e => 
                              {
                                if(e.status == 400)
                                 {
                                  return throwError(e);
                                 }
                               
                                swal(e.error.mensaje, e.error.error, "error");
                                return throwError(e);
                              })
                          );
  }

  getCliente(id):Observable<Cliente>
  {
    return this.httpClient.get<Cliente>(this.urlEndPoint + "/" + id)
                          .pipe(
                            catchError(e => 
                              {
                                /*
                                  redirijimos a la pagina clientes y lanzamos el error con un alert
                                */
                                this.router.navigate(["/clientes"]);

                                console.log(e.error.mensaje);
                                /*
                                  es error al editar ya que de esta funcion obtenemos 
                                  el cliente que vamos a editar y que nos redirije al formulario de edicion
                                */
                              
                                swal("Error al editar cliente", e.error.mensaje, "error");
                                return throwError(e);
                              })
                          );
  }

  update(cliente:Cliente):Observable<any>
  {
    return this.httpClient.put<any>(this.urlEndPoint + "/" + cliente.id, cliente, httpOptions)
                          .pipe(
                            catchError(e => 
                              {
                                if(e.status == 400)
                                {
                                 return throwError(e);
                                }                                
                              
                                swal("Error al editar cliente", e.error.mensaje, "error");
                                return throwError(e);
                              })
                          );
  }
  delete(id):Observable<Cliente>
  {
    return this.httpClient.delete<Cliente>(this.urlEndPoint + "/" + id, httpOptions)
                          .pipe(
                            catchError(e => 
                              {
                                console.log(e.error.mensaje);    
                              
                                swal("Error al eliminar cliente", e.error.mensaje, "error");
                                return throwError(e);
                              })
                          );
  }
}


