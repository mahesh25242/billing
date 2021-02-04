
import {  ipcMain, BrowserWindow } from 'electron';

export const printBill = () =>{
    const options = { 
        silent: true, 
        printBackground: true, 
        color: false, 
        margin: { 
            marginType: 'printableArea'
        }, 
        landscape: false, 
        pagesPerSheet: 1, 
        collate: false, 
        copies: 1, 
        header: 'Header of the Page', 
        footer: 'Footer of the Page'
    } 

      ipcMain.on("print", (event, arg) =>{
          const data = JSON.parse(arg);
        
        let win = new BrowserWindow({ 
            show: true,
            parent:true, 
            height: 600,
            width: 207,
            webPreferences: { 
                nodeIntegration: true
            } 
        }); 
        let total = 0;
        let pdtHtml = '';
        if(data.postParm.cart){
            data.postParm.cart.map(res=>{
                total = total+ res.price;
                pdtHtml += `<tr>
                                <td>${res.product.name} - ${res.product.selectedVarient.name} </td>
                                <td>${res.qty}</td>
                                <td>${res.price}</td>
                            </tr>`
            })
        }
        
        const page = [
            "<!DOCTYPE html>",
            `<html lang="en">`,
            "<head><title>Print preview</title>",
            `<style>               
                @page {
                    margin: 0;
                }
                body {
                    font-size: 12px;                    
                }   
                table {
                    width: 100%;
                    display: table;
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: monospace, cursive;
                }
                
        
            </style>`,
            "</head>",
            `<body>`,
            `<section id="main" style="width: 170px; margin: 0px;">`,
                `<div class="font" style="text-align: center; font-weight: 700; font-size: 14px;">
                    ${data.shop.name}
                </div>
                <div class="font" style="text-align: center; font-weight: 700; font-size: 14px;">
                    ${data.shop.address}
                </div>
                <div class="font" style="text-align: center; font-weight: 700; font-size: 14px;">
                ${data.shop.city.name}-${data.shop.pin}
                </div>
                <div class="font" style="text-align: center; font-weight: 700; font-size: 14px;">
                    Phone: ${data.shop.phone}
                </div>
                <hr>
                <div class="font" style="text-align: left; color: red; text-decoration: underline; font-size: 10px;">
                    To:  ${(data.postParm.name) ? data.postParm.name : '-'}${ (data.postParm.phone) ? `-${data.postParm.phone}` :''}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>qty</th>
                            <th>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pdtHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>Total</td>
                            <td>${total}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="font" >                   
                    <div style="text-align: center">Thank you vist again</div>                    
                </div>`,
            `<section>`,
            "</body>",
            "</html>"
          ].join("");
          
          
        win.loadURL("data:text/html;charset=utf-8," + encodeURI(page));

        win.webContents.on('did-finish-load', () => { 
            win.webContents.print(options, (success, failureReason) => { 
                if (!success) console.log(failureReason); 
                console.log('Print Initiated'); 

                win.close();
            }); 
        }); 
      })     

}