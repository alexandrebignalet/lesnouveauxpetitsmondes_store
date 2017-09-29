import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderLpnm } from './order-lpnm.model';
import { OrderLpnmService } from './order-lpnm.service';

@Injectable()
export class OrderLpnmPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private orderService: OrderLpnmService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.orderService.find(id).subscribe((order) => {
                    if (order.creationDate) {
                        order.creationDate = {
                            year: order.creationDate.getFullYear(),
                            month: order.creationDate.getMonth() + 1,
                            day: order.creationDate.getDate()
                        };
                    }
                    if (order.shippedDate) {
                        order.shippedDate = {
                            year: order.shippedDate.getFullYear(),
                            month: order.shippedDate.getMonth() + 1,
                            day: order.shippedDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.orderModalRef(component, order);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.orderModalRef(component, new OrderLpnm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderModalRef(component: Component, order: OrderLpnm): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.order = order;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
