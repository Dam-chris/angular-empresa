import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service'; 
import swal from 'sweetalert';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  
  constructor(private clienteService:ClienteService) { }

  
  ngOnInit()
  {
    /*
    cuando solo hay un parametro no hace falta implementar la funcion 
    de flecha sin embargo para manejo de errores seria comveniente hacerlo
    */
    this.clienteService.getClientes()
                        .pipe(
                          tap(res => 
                            {
                              console.log('un ejemplo de tap desde cliente componenet:');
                              
                              res.forEach(cliente => 
                                {
                                  console.log(cliente.nombre);
                                }); 
                            })
                        ).subscribe(
                          res => this.clientes = res,
                          err => console.log(err)
                          );
  }

  delete(cliente:Cliente)
  {
    swal({
      title: "¿Estas seguro?",
      text: `El cliente ${cliente.nombre} ${cliente.apellido} va a ser eliminado!!`,
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    })
    .then((willDelete) => 
    {
      if (willDelete) 
      {
        this.clienteService.delete(cliente.id)
                            .subscribe(
                              res =>
                              {
                                console.log(res);
                                this.clientes = this.clientes.filter(cli => cli !== cliente);
                                swal("Poof! Cliente eliminado!", 
                                {
                                  icon: "success",
                                });  
                              },
                              err => console.log(err)
                            );
      }
    });
  }

}
