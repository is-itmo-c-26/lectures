int doStuff(int Number,int X)
{
 int RESULT=0;
 for(int i=0;i<Number;i++){
  if(i%2==0)
 RESULT+=X;
 else {RESULT-=1;}
 }
 return RESULT;
}

int main()
{
 return doStuff(5,3)==7 ? 0 : 1;
}
