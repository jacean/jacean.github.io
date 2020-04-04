# GDB调试学习

file <filename>     load file to debug
r                   run program,if exist break ,pause
c                   continue execture program to next breakpoint or end
b <row number>      make breakpoint at number row
b <function name>   make breakpoint at function
d <breakpoint num>  delete breakpoint with num
s                   single step exec
n                   next row,single step without entry function
p <variable>        print the variable that pointed
i                   show some info
q                   quit the gdb enviroment 
help <command name> help to show information about command

那么，gdb到底是凭什么接管的一个进程的执行呢？其实，很简单，通过一个系统调用：ptrace。ptrace系统调用的原型如下：#include  long ptrace(enum __ptrace_request request, pid_t pid,void*addr,void*data);说明：ptrace系统调用提供了一种方法来让父进程可以观察和控制其它进程的执行，检查和改变其核心映像以及寄存器。 主要用来实现断点调试和系统调用跟踪。（man手册）其实，说到这里，一切原理层面应该都比较明朗了（且先不去管内核中是怎么实现ptrace的）。gdb就是调用这个系统调用，然后通过一些参数来控制其他进程的执行的。下面我们来看ptrace函数中request参数的一些主要选项：PTRACE_TRACEME： 表示本进程将被其父进程跟踪，交付给这个进程的所有信号，即使信号是忽略处理的（除SIGKILL之外），都将使其停止，父进程将通过wait()获知这一情况。这是什么意思呢？我们可以结合到gdb上来看。如果在gdb中run一个程序，首先gdb会fork一个子进程，然后该子进程调用ptrace系统调用，参数就是PTRACE_TRACEME，然后调用一个exec执行程序。基本过程是这样，细节上可能会有出入。需要注意的是，这个选项PTRACE_TRACEME是由子进程调用的而不是父进程！以下选项都是由父进程调用：PTRACE_ATTACH：attach到一个指定的进程，使其成为当前进程跟踪的子进程，而子进程的行为等同于它进行了一次PTRACE_TRACEME操作。但是，需要注意的是，虽然当前进程成为被跟踪进程的父进程，但是子进程使用getppid()的到的仍将是其原始父进程的pid。这下子gdb的attach功能也就明朗了。当你在gdb中使用attach命令来跟踪一个指定进程/线程的时候，gdb就自动成为改进程的父进程，而被跟踪的进程则使用了一次PTRACE_TRACEME，gdb也就顺理成章的接管了这个进程。PTRACE_CONT：继续运行之前停止的子进程。可同时向子进程交付指定的信号。这个选项呢，其实就相当于gdb中的continue命令。当你使用continue命令之后，一个被gdb停止的进程就能继续执行下去，如果有信号，信号也会被交付给子进程。除了以上这几个选项，ptrace还有很多其他选项，可以在linux下阅读man手册：man ptrace需要注意的另一点是，使用gdb调试过多线程/进程的人应该都知道，当子进程遇到一个信号的时候，gdb就会截获这个信号，并将子进程暂停下来。这是为什么呢？实际上，在使用参数为PTRACE_TRACEME或PTRACE_ATTACH的ptrace系统调用建立调试关系之后，交付给目标程序的任何信号（除SIGKILL之外）都将被gdb先行截获，或在远程调试中被gdbserver截获并通知gdb。gdb因此有机会对信号进行相应处理，并根据信号的属性决定在继续目标程序运行时是否将之前截获的信号实际交付给目标程序。