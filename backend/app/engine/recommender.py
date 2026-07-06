def get_advice(scan_results):
    skin = scan_results.get("skin", {})
    acne = scan_results.get("acne", {})
    hair = scan_results.get("hair_texture", {})
    dark = scan_results.get("dark_circles", {})

    undertone = skin.get("undertone", "")
    acne_severity = acne.get("overall_severity", "").lower()
    hair_type = hair.get("type", "")
    dark_severity = dark.get("severity", "")

    routine_am = []
    routine_pm = []
    lifestyle = []
    colors = []
    hair_advice = []
    eye_advice = []

    tone = skin.get("tone", "").lower()

    if "very light" in tone or ("light" in tone and "medium" not in tone):
        routine_am.append("Protetor solar FPS 50+; sua pele tende a queimar com facilidade")
        lifestyle.append("Reaplique o protetor solar a cada 2 horas ao ar livre")
        lifestyle.append("Sérum com niacinamida ajuda na vermelhidão e na barreira da pele")
    elif "light-medium" in tone or "medium" == tone:
        routine_am.append("Use protetor solar FPS 30 a 50 diariamente")
        lifestyle.append("Introduza retinoides e ácidos aos poucos")
        lifestyle.append("Sérum de vitamina C pela manhã ajuda a prevenir pigmentação inicial")
    elif "medium-dark" in tone or "dark" in tone:
        routine_am.append("Use FPS diariamente; sol sem proteção intensifica marcas de acne")
        lifestyle.append("Introduza ativos lentamente para reduzir risco de hiperpigmentação")
        lifestyle.append("Ácido azelaico ajuda a clarear manchas escuras com segurança")
        lifestyle.append("Evite inflamação sempre que possível, pois ela favorece pigmentação")

    if acne_severity == "mild":
        routine_am.append("Limpador com ácido salicílico de 0,5% a 2% para manter os poros limpos")
        routine_am.append("Sérum com niacinamida de 2% a 5% para controlar oleosidade")
        routine_pm.append("Tônico com ácido salicílico ou BHA leave-on para dissolver sebo à noite")
        routine_pm.append("Gel de ácido azelaico de 5% a 10% para prevenir obstruções e uniformizar o tom")
        routine_pm.append("Opcional: adapaleno em baixa dose 2 a 3 vezes por semana")
        lifestyle.append("Troque a fronha a cada 3 dias")
        lifestyle.append("Evite tocar o rosto para não transferir bactérias aos poros")

    elif acne_severity == "moderate":
        routine_am.append("Limpador com ácido salicílico para manter os poros limpos")
        routine_am.append("Sérum com niacinamida para reparar a barreira e controlar oleosidade")
        routine_am.append("Peróxido de benzoíla de 2,5% a 5% em pontos ativos")
        routine_pm.append("Gel de adapaleno: comece 2 vezes por semana e aumente aos poucos")
        routine_pm.append("Ácido azelaico de 10% a 20% para marcas pós-acne e inflamação")
        routine_pm.append("Hidratante com ceramidas para reduzir irritação do retinoide")
        lifestyle.append("Não esprema espinhas; isso pode causar cicatrizes e infecção")
        lifestyle.append("Reduza laticínios e alimentos de alto índice glicêmico se possível")
        lifestyle.append("Troque a fronha a cada 2 ou 3 dias")

    elif acne_severity == "severe":
        routine_am.append("Limpador suave sem espuma para não agredir a pele inflamada")
        routine_am.append("Hidratante com ceramidas para proteger a barreira da pele")
        routine_am.append("Use FPS; sol pode escurecer cicatrizes de acne")
        routine_pm.append("Use peróxido de benzoíla em baixa frequência para controlar bactérias")
        routine_pm.append("Hidratante reparador de barreira ou com ceramidas")
        lifestyle.append("Procure um dermatologista; acne grave pode exigir tratamento prescrito")
        lifestyle.append("Não misture vários ativos por conta própria, pois isso pode piorar a inflamação")
        lifestyle.append("Evite maquiagem comedogênica sobre lesões ativas")

    if dark_severity == "mild":
        routine_am.append("Sérum para olhos com cafeína pela manhã para reduzir inchaço")
        routine_pm.append("Creme para olhos com niacinamida à noite para pigmentação abaixo dos olhos")
        routine_pm.append("Retinol suave para olhos 2 a 3 vezes por semana")

    elif dark_severity == "severe":
        routine_am.append("Sérum para olhos com cafeína e vitamina C para iluminar a região")
        routine_pm.append("Creme para olhos com retinol à noite para melhorar textura gradualmente")
        lifestyle.append("Aplique protetor solar perto da área dos olhos para evitar piora da pigmentação")
        lifestyle.append("Produtos tópicos têm efeito limitado em olheiras estruturais ou genéticas profundas")

    if hair_type == "straight":
        hair_advice.append("Use shampoo leve e lave com frequência; a oleosidade se espalha rápido no cabelo liso")
        hair_advice.append("Aplique condicionador apenas no comprimento e nas pontas")
        hair_advice.append("Use shampoo a seco entre lavagens para dar volume")
        hair_advice.append("Evite óleos pesados no couro cabeludo")

    elif hair_type == "wavy":
        hair_advice.append("Use shampoo de hidratação equilibrada para controlar ressecamento e frizz")
        hair_advice.append("Aplique leave-in leve para definir as ondas")
        hair_advice.append("Spray de sal pode realçar a textura natural")
        hair_advice.append("Evite escovar o cabelo seco; amasse os fios para reduzir frizz")

    elif hair_type == "curly":
        hair_advice.append("Use limpador suave sem sulfato para preservar a hidratação dos cachos")
        hair_advice.append("Faça hidratação profunda uma vez por semana")
        hair_advice.append("Aplique leave-in e creme de pentear com o cabelo bem molhado")
        hair_advice.append("Experimente amassar o cabelo durante o condicionamento para formar melhor os cachos")
        hair_advice.append("Evite calor excessivo e escovação agressiva")

    elif hair_type == "coily":
        hair_advice.append("Use o método LOC: líquido, óleo leve e creme para reter hidratação")
        hair_advice.append("Faça co-wash ou use shampoo muito suave")
        hair_advice.append("Penteados protetores reduzem quebra de forma significativa")
        hair_advice.append("Prefira estilos de baixa manipulação")
        hair_advice.append("Evite calor frequente e desembaraço agressivo")

    if undertone == "warm":
        colors.append("Seu subtom quente combina com tons terrosos: mostarda, vermelho tijolo, coral, verde oliva, laranja e creme")
        colors.append("Evite azul muito frio, cinza frio e tons pastel azulados")

    elif undertone == "cool":
        colors.append("Seu subtom frio combina com tons joia: verde esmeralda, azul safira, vermelho rubi, lavanda, berry e vinho")
        colors.append("Branco puro e cinza carvão tendem a valorizar sua pele")
        colors.append("Evite laranja intenso e tons terrosos muito amarelados")

    elif undertone == "neutral":
        colors.append("Subtons neutros combinam bem com cores quentes e frias")
        colors.append("Boas opções: rosa suave, teal, verde sálvia, vermelho verdadeiro, azul-marinho e taupe")

    return {
        "routine_am": routine_am,
        "routine_pm": routine_pm,
        "lifestyle": lifestyle,
        "colors": colors,
        "hair": hair_advice,
        "eye_care": eye_advice
    }
