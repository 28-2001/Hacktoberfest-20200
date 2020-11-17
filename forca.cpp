#include <iostream>
#include <stdlib.h>

using namespace std;

int main(){

    char palavra[50], aux[50], letra;
    int chance = 6,tam = 0,i = 0,cont = 0;
    bool cond = true;
    cout << "Digite a palavra: ";
    cin >> palavra;

    while(palavra[i] != '\0'){
        ++tam;
        ++i;
    }

    for(int i=0; i<tam;++i){
        aux[i]='-';
    }

    inicio:

        system("cls");

        cond = (cont == tam) ? false : true;

        if(cond){
            cout << "Chances restantes: " << chance << endl;
            cout << "\nPalvra: ";

            for(int i=0; i<tam;++i){
                cout << aux[i];
            }

            cout << "\n\nDigite uma letra: ";
            cin >> letra;

            for(int i=0; i<tam;++i){
                if(palavra[i] == letra){
                    aux[i] = palavra[i];
                    cont++;
                    goto inicio;
                }
            }

            chance--;
            if(chance > 0){
                goto inicio;
            }
        }

    cout << "\nA palavra era: " << palavra<<endl;


}
