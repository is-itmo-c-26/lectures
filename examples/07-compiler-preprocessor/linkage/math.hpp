#pragma once

static const float kPi = 3.14F;  // internal linkage: своя копия в каждом .cpp
extern const float kE;           // external linkage: определение в main.cpp
const int kAnswer = 239;         // const на уровне файла — internal linkage
static int counter = 0;          // internal linkage, изменяемая
extern int total;                // external linkage: определение в main.cpp
// int shared = 239;             // duplicate symbol при компоновке

void PrintInfo();
