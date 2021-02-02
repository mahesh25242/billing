/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { shell, remote} from 'electron';



export const windowMenu = (win) =>  [
    {
        label: 'File',
        submenu: [
           {
            label: 'Sign Out',
            accelerator: 'CmdOrCtrl+E',            
            toolTip: 'toottip',            
            click: () =>{                       
                win.webContents.send('sign-out-only');                
            }
           },
           {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',            
            toolTip: 'toottip',            
            click: () =>{                       
                win.webContents.send('sign-out');
                //win.close();
            }
           }           
        ]
     },
     {
       label: 'Edit',
       submenu: [
          {
             role: 'undo'
          },
          {
             role: 'redo'
          },
          {
             type: 'separator'
          },
          {
             role: 'cut'
          },
          {
             role: 'copy'
          },
          {
             role: 'paste'
          }
       ]
    },
    
    {
       label: 'View',
       submenu: [
          {
             role: 'reload'
          },
          {
             role: 'toggledevtools'
          },
          {
             type: 'separator'
          },
          {
             role: 'resetzoom'
          },
          {
             role: 'zoomin'
          },
          {
             role: 'zoomout'
          },
          {
             type: 'separator'
          },
          {
             role: 'togglefullscreen'
          }
       ]
    },
    
    {
        label: 'Orders',        
        submenu: [
          {
            label: 'List Orders',            
            accelerator: 'Shift+CmdOrCtrl+P',
            id: 'ListOrders',
            click: () =>{                       
                win.webContents.send('list-orders');
            }
          }          
       ]
    },
    {
        label: 'Billing',
        visible: false,
        submenu: [
          {
            label: 'New Billing',
            accelerator: 'Shift+CmdOrCtrl+B',
            id: 'NewBilling',
            click: () =>{                                 
                win.webContents.send('new-billing');
            }
          },          
       ]
    },
    
    {
       role: 'help',
       submenu: [
          {
             label: 'Learn More'
          },
          {
              label: 'Shop',
              click:  () => {  
                  win.webContents.send('open-shop-site');                              
              }
      
          }
       ]
    }
  ];