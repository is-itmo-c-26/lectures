#include <iostream>
#include <vector>
#include<string>

constexpr int max_count = 5;

int   sum( std::vector<int> values ){
  int Result=0;
  for(int value:values){ Result+=value; }
  return Result;
}

void print(int value){
    if(value>0)
        std::cout<<"positive"<<std::endl;
        std::cout<<value<<std::endl;
    return;
}

int main(){
    std::vector<int> numbers={1,2,3,4,5};
    if(numbers.size()>max_count){ print(-1); }
    print(sum(numbers));
  return 0;
}
