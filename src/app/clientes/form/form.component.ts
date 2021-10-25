import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../cliente';
import swal from 'sweetalert';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit 
{
  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear Cliente"
  public errors:string[];

  constructor(private clienteService:ClienteService, 
              private router:Router,
              private activatedRoute: ActivatedRoute) { }


  
  ngOnInit() 
  {
    this.cargarCliente();
  }
  
  
  
  cargarCliente()
  {

    this.activatedRoute.params.subscribe(params => 
      {
        let id = params['id'];
        if (id) 
        {
          this.clienteService.getCliente(id)
                        .subscribe(
                          res => this.cliente = res,
                          err => console.log(err)
                        );  
        }
      });
    
  }

  create()
  {
    console.log(this.cliente);
    this.clienteService.createCliente(this.cliente)
                        .subscribe(
                          res => 
                          {
                            this.router.navigate(['/clientes']); 
                            swal('Nuevo cliente creado', `el cliente ${res.nombre} ${res.apellido} ha sido creado con exito!!`, 'success');
                            console.log(res);
                          }, 
                          err => 
                          {
                            this.errors = err.error.errors as string[];

                            console.log(err);
                          }
                          );
  }


  update()
  {
    this.clienteService.update(this.cliente)
                        .subscribe(
                          res =>
                          {
                            this.router.navigate(['/clientes']);
                            swal('Cleinte editado correctamente', `${res.mensaje} <${res.cliente.nombre}>`, 'success');
                            console.log(res);
                            
                          },
                          err => 
                          {
                            this.errors = err.error.errors as string[];
                            console.log(err);
                          }
                        );
  }

}
